const db = require('../../models');
const { Op } = require('sequelize');
const { update_failed, service_not_found, reservation_not_found, travail_not_found, user_unauthenticated } = require('../errors/errorObjects');
const Res = db.reservation;
const ResTravail = db.reservation_travail;
const User = db.user;
const Zone = db.zone;
const Service = db.service;
const Work = db.travail;
const GW = db.gamme_travaux;
const Aff = db.affectation;
const Art = db.artisan;
const CanceledRes = db.reservation_annulee;

const email = require('../../config/mailer');

exports.create_reservation = async (req, res, next) => {
    try {
        const data = req.body;
        let user = req.user;

        if (!user) {
            return next(user_unauthenticated);
        }

        const z = await Zone.findByPk(data.zone);
        if (!z) {
            return next(zone_not_exist);
        }

        const service = await Service.findByPk(data.service);

        if (!service) {
            return next(service_not_found);
        }


        if (data.originale) {
            const originale = await Res.findByPk(data.originale);
            if (!originale) {
                return next({
                    code: 'reservation/not_found',
                    message: 'La reservation passée comme l\'originale est incorrecte',
                });
            }
        }

        const reserv = await Res.create({
            date_w: data.date_w,
            details: data.details,
            autreTel: data.autreTel,
            commune: data.commune,
            quartier: data.quartier,
            avenue: data.avenue,
            numero: data.num,
            position: data.position,
            userId: user.id,
            zoneId: z.id,
            account_type: 'anonymous',
            gravite: data.gravite,
            serviceId: service.id,
            autresTravaux: data.autresTravaux,
            originaleId: data.originale,
        });

        const travaux = data.travaux;
        if (travaux instanceof Array) {
            const travs = travaux.map(t => {
                return {
                    travailId: t.id,
                    nbreObjet: t.nbreObjet,
                    reservationId: reserv.id
                };
            });
            rTravaux = await ResTravail.bulkCreate(travs);
        }

        const rT = (await ResTravail.findAll({
            where: {
                reservationId: reserv.id
            },
            include: {
                model: Work,
                as: 'travail'
            }
        })).map(rt => rt.travail);

        email.send({
            template: 'reservation',
            message: {
                to: 'samkin1997@gmail.com,elkatalayi01@gmail.com'
            },
            locals: {
                service: service.nom_service,
                works: rT,
                tel: user.tel,
                details: reserv.details,
                address: `${reserv.commune}, ${reserv.quartier} ${reserv.avenue} ${reserv.numero}`,
                date: reserv.date_w.toLocaleDateString('en-GB'),
                urgence: reserv.gavite === "urgence" ? true : false
            }
        }).catch((err) => {
            console.log(err);
        });

        return res.json({
            ...reserv.dataValues,
            service
        });
    } catch (err) {
        next(err);
    }
};

exports.update_reservation = async (req, res, next) => {
    try {
        let data = req.body;
        const reserv = await Res.findByPk(req.params.reservationId, {
            include: [CanceledRes]
        });

        if (!reserv) {
            return next(reservation_not_found);
        }

        if (res.reservation_annulee) {
            return next({
                code: 'reservation/Allready_canceled',
                message: 'Cette reservation est déjà annulée',
            });
        }

        if (data.zoneId) {
            const z = await Zone.findByPk(data.zoneId);
            if (!z) {
                return next(zone_not_exist);
            }
        }

        if (data.originaleId) {
            const { originaleId, ...other } = data;
            data = other;
        }

        const update = await Res.update(data, {
            where: {
                id: req.params.reservationId
            }
        });

        if (update[0] === 1) {
            const r = await Res.findByPk(req.params.reservationId, {
                include: [
                    Service,
                    Zone,
                    User,
                    {
                        model: Aff,
                        include: {
                            model: Art,
                            include: User
                        },
                    },
                    {
                        model: Work,
                        as: 'travaux',
                        include: [{
                            model: GW,
                            as: 'gamme'
                        }, ResTravail]
                    },
                    CanceledRes
                ]
            });
            return res.json(r);
        }

        return next(update_failed);
    } catch (err) {
        next(err);
    }
};

exports.reservation_add_travail = async (req, res, next) => {
    try {
        const reserv = await Res.findByPk(req.params.reservationId);

        if (!reserv) {
            return next(reservation_not_found);
        }

        const trav = await Work.findByPk(req.params.travailId);

        if (!trav) {
            return next(travail_not_found);
        }

        const exist = await ResTravail.findOne({
            where: {
                [Op.and]: {
                    reservationId: reserv.id,
                    travailId: trav.id,
                }
            }
        });

        if (exist) {
            return res.json({
                code: 'reservation_travail/already_exist',
                message: "Cette reservation a déjà ce travail.",
                status: 200
            });
        }

        const rTrav = await ResTravail.create({
            reservationId: reserv.id,
            travailId: service.id
        });

        return res.json(rTrav);
    } catch (err) {
        next(err);
    }
};

exports.reservation_remove_travail = async (req, res, next) => {
    try {
        const reserv = await Res.findByPk(req.params.reservationId);
        if (!reserv) {
            return next(reservation_not_found);
        }

        const t = await Work.findByPk(req.params.travailId);
        if (!t) {
            return next(travail_not_found);
        }

        ResTravail.destroy({
            where: {
                [Op.and]: [
                    { travailId: t.id },
                    { reservationId: reserv.id }
                ]
            }
        }).then(result => {
            if (result === 1) {
                return res.json({
                    result,
                    message: "One record deleted"
                });
            }
            return res.json({
                result,
                message: "No record was deleted"
            });
        });
    } catch (err) {
        next(err);
    }
};

exports.get_all = async (req, res, next) => {
    try {
        const reservs = await Res.findAll({
            include: [User, Service, Zone, CanceledRes],
        });

        return res.json(reservs);
    } catch (err) {
        next(err);
    }
};

exports.get_one = async (req, res, next) => {
    try {
        const reserv = await Res.findByPk(req.params.reservationId, {
            include: [
                Service,
                Zone,
                User,
                {
                    model: Aff,
                    include: {
                        model: Art,
                        include: User
                    },
                },
                {
                    model: Work,
                    as: 'travaux',
                    include: [{
                        model: GW,
                        as: 'gamme'
                    }, ResTravail]
                },
                CanceledRes
            ],
        });

        if (!reserv) {
            return next(reservation_not_found);
        }

        if (!reserv) {
            return next(reservation_not_found);
        }

        return res.json(reserv);
    } catch (err) {
        next(err);
    }
};

exports.get_reservation_qualified_artisan = async (req, res, next) => {
    try {
        const r = await Res.findByPk(req.params.reservationId);

        if (!r) {
            return next(reservation_not_found);
        }

        const artisans = await Art.findAll({
            where: {
                serviceId: r.serviceId,
                etat: 'actif',
                zoneId: r.zoneId
            },
            include: [User]
        });

        return res.json(artisans);
    } catch (err) {
        next(err);
    }
};


exports.cancel_reservation = async (req, res, next) => {
    try {
        const reserv = await Res.findByPk(req.params.reservationId, {
            include: CanceledRes
        });

        if (!reserv) {
            return next(reservation_not_found);
        }

        if (reserv.reservation_annulee && reserv.etat === 'annulée') {
            return next({
                status: 200,
                code: 'reservation/Allready_canceled',
                message: 'Cette reservation est déjà annulée',
            });
        }

        const result = await Res.update({ etat: 'annulée' }, {
            where: {
                id: reserv.id
            }
        });

        if (result[0] === 1) {

            const c = await CanceledRes.findOne({
                where: {
                    reservationId: reserv.id
                }
            });

            if (!c) {
                await CanceledRes.create({
                    reservationId: reserv.id,
                    motif: req.body.motif,
                });
            }

            const r = await Res.findByPk(req.params.reservationId, {
                include: [
                    Service,
                    Zone,
                    User,
                    {
                        model: Aff,
                        include: {
                            model: Art,
                            include: User
                        },
                    },
                    {
                        model: Work,
                        as: 'travaux',
                        include: [{
                            model: GW,
                            as: 'gamme'
                        }, ResTravail]
                    },
                    CanceledRes
                ]
            });
            return res.json(r);
        }

        return res.json({
            status: 'reservation/cancel_failed',
            message: "La demande d'annulation a échoué.",
        });
    } catch (err) {
        next(err);
    }
};


exports.add_reason_to_reservation_cancel = async (req, res, next) => {
    try {
        const canceled = await CanceledRes.findOne({
            where: {
                reservationId: req.params.reservationId
            }
        });

        if (!canceled) {
            return next({
                code: 'cancelation/not_found',
                message: 'La demande d\'annulation est incorrecte',
            });
        }

        const result = await CanceledRes.update({ motif: req.body.motif }, {
            where: {
                id: canceled.id
            }
        });

        if (result[0] === 1) {
            return res.json({
                state: 'success',
                message: 'Motif ajouté',
            });
        }

        return res.json({
            code: 'canceld_confirmation/update_failed',
            message: 'La mise à jour a echoué.'
        });
    } catch (err) {
        next(err);
    }
};

exports.confirm_reservation_cancel = async (req, res, next) => {
    try {
        const canceled = await CanceledRes.findByPk(req.params.cancelationId);

        if (!canceled) {
            return next({
                code: 'cancelation/not_found',
                message: 'La demande d\'annulation est incorrecte',
            });
        }

        const result = await CanceledRes.update({ etat: 'effectif' }, {
            where: {
                id: canceled.id
            }
        });

        if (result[0] === 1) {
            return res.json({
                state: 'success',
                message: 'Reservation annulée',
            });
        }

        return res.json({
            code: 'canceld/confirmation failed',
            message: 'La confirmation de l\'annulation de la reservation a echoué.'
        });
    } catch (err) {
        next(err);
    }
};
