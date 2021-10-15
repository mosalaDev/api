const db = require('../../models');
const { Op } = require('sequelize');
const Art = db.artisan;
const Zone = db.zone;
const User = db.user;
const Work = db.travail;
const Sp = db.specialite_artisan;
const Serv = db.service;
const Aff = db.affectation;
const Res = db.reservation;
const Cert = db.certificat;
const { zone_not_exist, artisan_not_exist, update_failed, artisan_exist, travail_not_found, service_not_found, user_unauthenticated } = require('../errors/errorObjects');

exports.create_artisan_account = async (req, res, next) => {
    try {
        const user = req.user;

        if (!user) {
            return res.json(user_unauthenticated);
        }

        const a = await user.getArtisan();

        if (a) {
            return next(artisan_exist);
        }


        const data = req.body;

        const s = await Serv.findByPk(data.service);

        if (!s) {
            return next(service_not_found);
        }

        const z = await Zone.findByPk(data.zone);

        if (!z) {
            return next(zone_not_exist);
        }

        if (!(data.specialites instanceof Array)) {
            return next({
                code: 'data/bad_data_format',
                message: "Mauvais format de données.",
                status: 200
            });
        }

        const artisan = await Art.create({
            userId: user.id,
            tranche_age: data.tranche_age,
            formateurs: data.formateurs,
            debut_experience: data.debut_experience,
            organisation: data.organisation,
            adresse_travail: data.adresse_travail,
            serviceId: s.id,
            zoneId: z.id,
        });

        user.account_type = 'artisan';
        await user.save();

        const specs = data.specialites.map(spec => {
            return {
                artisanId: artisan.id,
                travailId: spec
            };
        });

        await Sp.bulkCreate(specs);

        return res.json({
            status: 'success',
            message: "Demande envoyée avec succès."
        });
    } catch (err) {
        next(err);
    }
};

exports.artisan_change_status = async (req, res, next) => {
    try {
        let a = await Art.findByPk(req.params.artisanId);

        if (!a) {
            return next(artisan_not_exist);
        }

        const status = req.body.status;

        const u = await Art.update({ status }, {
            where: {
                id: a.id
            },
            include: [Cert, {
                model: User,
                attributes: { exclude: 'mot_passe' }
            }, Serv, Zone, {
                    model: Work,
                    as: 'specialites'
                }]
        });

        if (u[0] === 1) {
            const uA = await Art.findByPk(a.id);
            return res.json(uA);
        }

        return next(update_failed);
    } catch (err) {
        next(err);
    }
};

exports.verify_competences = async (req, res, next) => {
    try {
        const a = await Art.findByPk(req.params.artisanId);

        if (!a) {
            return next(artisan_not_exist);
        }

        const niveau = req.body.niveau;
        const u = await Sp.update({ niveau }, {
            where: {
                artisanId: a.id
            },
        });

        if (u[0] !== 0) {
            const uA = await Art.findByPk(a.id, {
                include: [Cert, {
                    model: User,
                    attributes: { exclude: 'mot_passe' }
                }, Serv, Zone, {
                        model: Work,
                        as: 'specialites'
                    }]
            });
            return res.json(uA);
        }

        return next(update_failed);
    } catch (err) {
        next(err);
    }
};

exports.get_certifications = async (req, res, next) => {
    try {
        const certs = await Cert.findAll();
        return res.json(certs);
    } catch (err) {
        next(err);
    }
};
exports.certify = async (req, res, next) => {
    try {
        const data = req.body;
        let a = await Art.findByPk(req.params.artisanId);

        if (!a) {
            return next(artisan_not_exist);
        }

        const cert = await Cert.findOne({
            where: {
                [Op.and]: {
                    artisanId: a.id,
                    serviceId: a.serviceId
                }
            }
        });
        if (cert) {
            return next({
                code: 'certifica/exist',
                message: 'C\'est technicien a déjà un certificat pour ' + a.service
            });
        }

        await Cert.create({
            artisanId: a.id,
            serviceId: a.serviceId,
            etique: data.etique
        });

        a = await Art.findByPk(req.params.artisanId, {
            include: [Cert, {
                model: User,
                attributes: { exclude: 'mot_passe' }
            }, Serv, Zone, {
                    model: Work,
                    as: 'specialites'
                }]
        });

        return res.json(a);
    } catch (err) {
        next(err);
    }
};

exports.artisan_activate = async (req, res, next) => {
    try {
        const a = await Art.findByPk(req.params.artisanId);

        if (!a) {
            return next(artisan_not_exist);
        }

        const u = await Art.update({ etat: 'actif' }, {
            where: {
                id: a.id
            }
        });

        if (u[0] === 1) {
            const uA = await Art.findByPk(a.id, {
                include: [Cert, {
                    model: User,
                    attributes: { exclude: 'mot_passe' }
                }, Serv, Zone, {
                        model: Work,
                        as: 'specialites'
                    }]
            });
            return res.json(uA);
        }

        return next(update_failed);
    } catch (err) {
        next(err);
    }
};

exports.artisan_desactivate = async (req, res, next) => {
    try {
        const a = await Art.findByPk(req.params.artisanId);

        if (!a) {
            return next(artisan_not_exist);
        }

        const u = await Art.update({ etat: 'inactif' }, {
            where: {
                id: a.id
            }
        });

        if (u[0] === 1) {
            const uA = await Art.findByPk(a.id, {
                include: [Cert, {
                    model: User,
                    attributes: { exclude: 'mot_passe' }
                }, Serv, Zone, {
                        model: Work,
                        as: 'specialites'
                    }]
            });
            return res.json(uA);
        }

        return next(update_failed);
    } catch (err) {
        next(err);
    }
};

exports.update_artisan = async (req, res, next) => {
    try {
        const { experience, formateurs, metiers, specificites, etique } = req.body;
        const a = await Art.findByPk(req.params.artisanId);

        if (!a) {
            return next(artisan_not_exist);
        }

        const data = { experience };

        if (formateurs && formateurs instanceof Array) {
            formateurs.forEach(f => {
                if (a.formateurs.indexOf(f) === -1) {
                    data.formateurs = `${a.formateurs},${f.toString()}`;
                }
            });
        } else if (typeof formateurs === "string") {
            if (a.formateurs.indexOf(formateurs) === -1) {
                data.formateurs = `${a.formateurs},${formateurs}`;
            }
        }
        if (specificites && specificites instanceof Array) {
            specificites.forEach(s => {
                if (a.specificites.indexOf(s) === -1) {
                    data.specificites = `${a.specificites},${s.toString()}`;
                }
            });
        } else if (typeof specificites === "string") {
            if (a.specificites.indexOf(specificites) === -1) {
                data.specificites = `${a.specificites},${specificites}`;
            }
        }
        if (metiers && metiers instanceof Array) {
            metiers.forEach(m => {
                if (a.metiers.indexOf(m) === -1) {
                    data.metiers = `${a.metiers},${m.toString()}`;
                }
            });
        } else if (typeof metiers === "string") {
            if (a.metiers.indexOf(metiers) === -1) {
                data.metiers = `${a.metiers},${metiers}`;
            }
        }

        const update = await Art.update({ ...data, etique }, {
            where: {
                id: a.id
            }
        });

        if (update[0] === 1) {
            const artisan = await Art.findByPk(a.id, {
                include: [Cert, {
                    model: User,
                    attributes: { exclude: 'mot_passe' }
                }, Serv, Zone, { model: Work, as: 'specialites' }]
            });
            return res.json(artisan);
        }

        return res.json(update_failed);
    } catch (err) {
        next(err);
    }
};

exports.get_all_artisans = async (req, res, next) => {
    try {
        const artisans = await Art.findAll({
            include: [{
                model: User,
                attributes: { exclude: 'mot_passe' }
            }, Serv, Zone, {
                model: Work,
                as: 'specialites'
            }, Cert],
        });

        return res.json(artisans);
    } catch (err) {
        next(err);
    }
};

exports.get_by_id = async (req, res, next) => {
    try {
        const artisan = await Art.findByPk(req.params.artisanId, {
            include: [Cert, {
                model: User,
                attributes: { exclude: 'mot_passe' }
            }, Serv, Zone, {
                    model: Work,
                    as: 'specialites'
                }, {
                    model: Aff,
                    as: 'affectations',
                    include: [{ model: Res, include: Serv }]
                }],
            attributes: { exclude: ['user.mot_passe'] },
        });

        if (!artisan) {
            return res.json(artisan_not_exist);
        }

        return res.json(artisan);
    } catch (err) {
        next(err);
    }
};

exports.get_by_username = async (req, res, next) => {
    try {
        const artisan = await findArtisanByUsername(req.params.username);

        if (!artisan) {
            return res.json({
                code: 'artisan/not_exist',
                message: 'Aucun artisan ne correspond à ce nom d\'utilisateur.'
            });
        }

        return res.json(artisan);
    } catch (err) {
        next(err);
    }
};

exports.artisan_add_speciality = async (req, res, next) => {
    try {
        const a = await Art.findByPk(req.params.artisanId);
        if (!a) {
            return next(artisan_not_exist);
        }

        const t = await Work.findByPk(req.params.travailId);
        if (!t) {
            return next(travail_not_found);
        }

        const exist = await Sp.findOne({
            where: {
                [Op.and]: [
                    { artisanId: a.id },
                    { travailId: t.id }
                ]
            }
        });

        if (exist) {
            return next({
                code: 'artsan-panne/record_duplication',
                message: "L'artisan a déjà cette spécialité",
                status: 200
            });
        }

        const sp = await Sp.create({
            travailId: t.id,
            artisanId: a.id,
            description: req.body.description
        });

        return res.json(sp);
    } catch (err) {
        next(err);
    }
};

exports.get_artisan_specialities = async (req, res, next) => {
    try {
        const a = await Art.findByPk(req.params.artisanId);

        if (!a) {
            return next(artisan_not_exist);
        }

        const sp = await Sp.findAll({
            where: {
                artisanId: a.id
            },
            include: [Work, Art],
        });

        return res.json(sp);
    } catch (err) {
        next(err);
    }
};

exports.artisan_remove_speciality = async (req, res, next) => {
    try {
        const a = await Art.findByPk(req.params.artisanId);

        if (!a) {
            return next(artisan_not_exist);
        }

        const t = await Work.findByPk(req.params.travailId);

        if (!t) {
            return next(travail_not_found);
        }

        const result = await Sp.destroy({
            where: {
                [Op.and]: {
                    travailId: t.id,
                    artisanId: a.id,
                }
            }
        });

        if (result === 1) {
            return res.json({
                response: result,
                message: 'One record deleted'
            });
        }

        return res.json({
            response: result,
            message: "No reacord was deleted"
        });
    } catch (err) {
        next(err);
    }
};

const findArtisanByUsername = async (username) => {
    const u = await User.findOne({
        where: {
            username: username
        },
        attributes: { exclude: ['mot_passe'] },
    });

    const a = await Art.findOne({
        where: {
            userId: u.id
        },
        include: [Cert, {
            model: User,
            attributes: { exclude: 'mot_passe' }
        }, Serv, Zone, {
                model: Work,
                as: 'specialites'
            }]
    });

    return a;
};
