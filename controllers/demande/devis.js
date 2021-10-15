const db = require('../../models');
const { update_failed, demande_devis_not_exist, zone_not_exist } = require('../errors/errorObjects');
const Dem = db.demande_devis;
const User = db.user;
const Devis = db.demandeDevis_matSpec;
const Zone = db.zone;

exports.create_demande = async (req, res, next) => {
    try {
        const data = req.body;
        let user = req.user;

        if (!user) {
            user = await User.create({
                nom: data.name,
                username: `${data.name}`,
                tel: data.tel,
                email: data.email
            });
        }

        const pannes = data.pannes;

        if (!(pannes instanceof Array)) {
            return next({
                code: 'pannes/bad_format',
                message: 'Mauvais format de données des pannes'
            });
        }

        const z = await Zone.findByPk(data.zone);
        if (!zone) {
            return next(zone_not_exist);
        }

        const dem = await Dem.create({
            libele: data.libele,
            date_w: data.date_w,
            heure_w: data.heure_w,
            detaille: data.details,
            userId: user.id,
            zoneId: z.id
        });

        const ps = pannes.map(p => {
            return {
                panneId: p,
                demandeDeviId: dem.id
            };
        });

        const saved = await Devis.bulkCreate(ps);

        return res.json({
            dem,
            saved
        });

    } catch (err) {
        next(err);
    }
};

exports.update_prestation = async (req, res, next) => {
    try {
        const data = req.body;
        const dem = await Dem.findByPk(req.params.demId);

        if (!dem) {
            return next(demande_devis_not_exist);
        }

        if (data.zoneId) {
            const z = await Zone.findByPk(data.zoneId);
            if (!z) {
                return next(zone_not_exist);
            }
        }

        const update = await Dem.update(data, {
            where: {
                id: dem.id
            }
        });

        let pannes = await Devis.findAll({
            where: {
                demandeDeviId: dem.id
            }
        });

        if (pannes) {
            if (!(pannes instanceof Array)) {
                return next({
                    code: 'devis/bad_format',
                    message: 'Mauvais format de données des devis'
                });
            }

            const ps = pannes.map(p => {
                return {
                    panneId: p,
                    demandeDeviId: dem.id
                };
            });

            pannes = await Devis.bulkCreate(ps);
        }

        if (update[0] === 0) {
            const d = await Dem.findByPk(req.params.demId);
            return res.json({
                demmade: d,
                devis: pannes
            });
        }

        return next(update_failed);
    } catch (err) {
        next(err);
    }
};

exports.get_all = async (req, res, next) => {
    try {
        const prestations = await Dem.findAll();

        return res.json(prestations);
    } catch (err) {
        next(err);
    }
};

exports.get_one = async (req, res, next) => {
    try {
        const prestation = await Dem.findByPk(req.params.demId);

        if (!prestation) {
            return next(demande_devis_not_exist);
        }

        return res.json(prestation);
    } catch (err) {
        next(err);
    }
};

