const { Op } = require('sequelize');
const db = require('../../models');
const Admin = db.admin;
const Poste = db.poste;
const Droit = db.droit;
const bcrypt = require('bcryptjs');
const passport = require('passport');
const { update_failed } = require('../errors/errorObjects');

exports.create_admin = async (req, res, next) => {
    try {
        const data = req.body;
        const a = await Admin.findOne({
            where: {
                [Op.or]: [
                    { tel: data.tel },
                    { email: data.email }
                ]
            }
        });

        if (a) {
            return next({
                code: 'admin/exist',
                message: 'l\'adresse email ou le numéro de téléphone existe déjà.'
            });
        }

        const hash = bcrypt.hash(data.mot_passe, 10);

        await Admin.create({
            username: data.tel,
            tel: data.tel,
            nom: data.nom,
            postnom: data.postnom,
            prenom: data.prenom,
            emain: data.email,
            sexe: data.sexe,
            ville: data.ville,
            commune: data.commune,
            mot_passe: hash
        });

        return res.json({
            status: 'success',
            message: 'Admin crée avec succès.'
        });
    } catch (err) {
        next(err);
    }
};

exports.login_admin = async (req, res, next) => {
    passport.authenticate('local', async (err, user, info) => {
        if (err) { return next(err); }

        if (!user) {
            return res.json({
                code: 'admin/connection_error',
                message: info.message
            });
        }

        req.login(user, function (err) {
            if (err) { return next(err); }

            return res.json({
                ...user,
                reservations,
                devis
            });
        });
    })(req, res, next);
};

exports.get_conected_admin = async (req, res, next) => {
    try {
        const user = req.user;

        if (!user) {
            return next(user_unauthenticated);
        }

        return res.json(user);
    } catch (err) {
        next(err);
    }
};

exports.add_poste = async (req, res, next) => {
    try {
        const a = await Admin.findByPk(req.params.adminId);

        if (!a) {
            return res.json({
                code: 'admin/not_found',
                message: 'Aucun compte administrateur ne correspond.'
            });
        }

        const p = await Poste.findByPk(req.params.posteId);

        if (!p) {
            return res.json({
                code: 'poste/not_found',
                message: 'Aucun poste administrateur ne correspond.'
            });
        }

        const update = await Admin.update({ posteId: p.id }, {
            where: {
                id: a.id
            }
        });

        if (update[0] === 1) {
            return res.json({
                status: 'success',
                message: 'Poste ajouté avec succès',
            });
        }

        return res.json(update_failed);
    } catch (err) {
        next(err);
    }
};

exports.update_admin = async (req, res, next) => {
    try {

    } catch (err) {
        next(err);
    }
};