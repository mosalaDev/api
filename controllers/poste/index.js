const { Op } = require('sequelize');
const db = require('../../models');
const { update_failed } = require('../errors/errorObjects');
const Poste = db.poste;
const Droit = db.droit;
const PDroit = db.post_droit;

exports.create_poste = async (req, res, next) => {
    try {
        const data = req.body;
        const p = await Poste.findOne({
            where: {
                [Op.or]: [
                    { nom: data.nom },
                    { code: data.code }
                ]
            }
        });

        if (!p) {
            return next({
                code: 'poste/exist',
                message: 'Ce poste existe déjà'
            });
        }

        const poste = Poste.create({
            nom: data.nom,
            code: data.code,
            description: data.description
        });

        return res.json(poste);
    } catch (err) {
        next(err);
    }
};

exports.add_droit = async (req, res, next) => {
    try {
        const p = await Poste.findByPk(req.params.posteId);

        if (!poste) {
            return next({
                code: 'poste/not_found',
                message: 'Aucun poste administrateur ne correspond.'
            });
        }

        const d = await Droit.findByPk(req.params.droitId);

        if (!d) {
            return next({
                code: 'droit/not_found',
                message: 'Aucun droit d\'accès ne correspond.'
            });
        }

        const pD = await PDroit.findOne({
            [Op.and]: [
                { postId: p.id },
                { droitId: d.id }
            ]
        });

        if (pD) {
            return next({
                code: 'post_droit/exist',
                message: 'Ce poste administrateur a déjà ce droit d\'accès'
            });
        }

        await PDroit.create({
            postId: p.id,
            droitId: d.id
        });

        const uP = await Poste.findByPk(p.id, {
            include: [PDroit]
        });
        return res.json(uP);
    } catch (err) {
        next(err);
    }
};

exports.remove_droit = async (req, res, next) => {
    try {
        const p = await Poste.findByPk(req.params.posteId);

        if (!p) {
            return next({
                code: 'poste/not_found',
                message: 'Aucun poste administrateur ne correspond.'
            });
        }

        const d = await Droit.findByPk(req.params.droitId);

        if (!d) {
            return next({
                code: 'droit/not_found',
                message: 'Aucun droit d\'accès ne correspond.'
            });
        }

        PDroit.destroy({
            [Op.and]: [
                { posteId: p.id },
                { droitId: d.id }
            ]
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

exports.update_poste = async (req, res, next) => {
    try {
        const data = req.params;
        const p = await Poste.findByPk(req.params.posteId);

        if (!p) {
            return next({
                code: 'poste/not_found',
                message: 'Aucun poste administrateur ne correspond.'
            });
        }

        const result = await Poste.update(data, {
            where: {
                id: p.id
            }
        });

        if (result[0] === 1) {
            return res.json({
                status: 'success',
                message: 'Mise à jour avec succès'
            });
        }

        return res.next(update_failed);
    } catch (err) {
        next(err);
    }
};

exports.get_all = async (req, res, next) => {
    try {
        const p = await Poste.findAll();

        return res.json(p);
    } catch (err) {
        next(err);
    }
};

exports.get_by_id = async (req, res, next) => {
    try {
        const p = await Poste.findByPk(req.params.posteId);

        if (!p) {
            return next({
                code: 'poste/not_found',
                message: 'Aucun poste administrateur ne correspond.'
            });
        }

        return res.json(p);
    } catch (err) {
        next(err);
    }
};