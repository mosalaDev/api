const db = require('../../models');
const { reservation_not_found, artisan_not_exist, update_failed } = require('../errors/errorObjects');
const Aff = db.affectation;
const Res = db.reservation;
const Art = db.artisan;
const User = db.user;

exports.create_affectation = async (req, res, next) => {
    try {
        const data = req.body;
        const r = await Res.findByPk(data.reservation);

        if (!r) {
            return next(reservation_not_found);
        }

        const a = await Art.findByPk(data.artisan);

        if (!a) {
            return next(artisan_not_exist);
        }

        const af = await Aff.create({
            reservationId: r.id,
            artisanId: a.id
        });

        const affectation = await Aff.findByPk(af.id, {
            include: [{ model: Art, include: User }]
        });

        return res.json(affectation);
    } catch (err) {
        next(err);
    }
};

exports.change_affectation = async (req, res, next) => {
    try {
        const data = req.data;
        const a = Aff.findByPk(req.params.affectationId);

        if (!a) {
            return next({
                code: 'affectation/not_found',
                message: 'Aucune affectation ne correspond.'
            });
        }

        const art = await Art.findByPk(data.artisan);
        if (!art) {
            return next(artisan_not_exist);
        }

        const update = await Aff.update({ artisanId: art.id }, {
            where: {
                id: a.id
            }
        });

        if (update[0] === 1) {
            const uA = await Aff.findByPk(a.id, {
                include: [Art, Res]
            });
            return res.json({
                status: 'success',
                affectation: uA
            });
        }

        return next(update_failed);
    } catch (err) {
        next(err);
    }
};
