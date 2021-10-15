const bcrypt = require('bcryptjs');
const passport = require('passport');
const db = require('../../models');
const User = db.user;
const Res = db.reservation;
const Devis = db.demande_devis;
const Zone = db.zone;
const Serv = db.service;
const Art = db.artisan;
const { user_not_exist, user_username_exist, user_unauthenticated, update_failed } = require('../errors/errorObjects');

exports.create_user = async (req, res, next) => {
    try {
        const data = req.body;
        const u = await findUserByUsername(data.tel);

        if (u) {
            return next(user_username_exist);
        }

        const pass = await bcrypt.hash(data.password, 10);

        await User.create({
            username: data.tel,
            nom: data.nom,
            postnom: data.postnom,
            prenom: data.prenom,
            sexe: data.sexe,
            ville: data.ville,
            commune: data.commune,
            quartier: data.quartier,
            tel: data.tel,
            email: data.email,
            mot_passe: pass,
        });

        return res.json({
            status: "success",
            message: "Le compte utilisateur a été créé avec succès."
        });
    } catch (err) {
        next(err);
    }
};

exports.update_user = async (req, res, next) => {
    try {
        const user = req.user;

        if (!user) {
            return next(user_unauthenticated);
        }

        let data = req.body;

        if (data.mot_passe) {
            const { mot_passe, ...other } = data;
            data = other;
        }
        if (data.username || data.tel) {
            const { username, tel, ...other } = data;
            data = other;
        }

        const update = await User.update(data, {
            where: {
                id: user.id
            }
        });

        if (update[0] === 1) {
            const u = await findUserByUsername(user.username);
            const r = await Res.count({
                where: {
                    userId: u.id
                },
                include: [Art]
            });
            const d = await Devis.count({
                where: {
                    userId: u.id
                }
            });

            return res.json({
                ...u.dataValues,
                reservations: r,
                devis: d
            });
        }

        return res.json(update_failed);
    } catch (err) {
        next(err);
    }
};

exports.update_password = async (req, res, next) => {
    try {
        const user = await User.findById(req.params.userId);
        if (!user) {
            return next(user_not_exist);
        }

        const updated = await User.update({ mot_passe: req.body.mot_passe }, {
            where: {
                id: user.id
            }
        });

        if (updated[0] === 1) {
            return res.json({
                status: 'success',
                message: 'Mot de passe modifié.'
            });
        }

        return res.next(update_failed);
    } catch (err) {
        next(err);
    }
};

exports.login_user = (req, res, next) => {
    passport.authenticate('local', async (err, user, info) => {
        if (err) { return next(err); }

        if (!user) {
            return res.json({
                code: 'user/connection_error',
                message: info.message
            });
        }

        const reservations = await Res.count({
            where: {
                userId: user.id
            }
        });
        const devis = await Devis.count({
            where: {
                userId: user.id
            }
        });

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

exports.logout_user = async (req, res, next) => {
    try {
        const user = req.user;

        if (!user) {
            return res.json({
                code: 'user/unauthenticated',
                message: "Aucun utilisateur connecté.",
            });
        }

        await req.logOut();

        return res.json({
            message: 'Utilisateur déconnecté.'
        });
    } catch (err) {
        next(err);
    }
};

exports.get_users = async (req, res, next) => {
    try {
        const { count, users } = await User.findAndCountAll({
            include: [Art]
        });

        return res.json({
            count,
            users
        });
    } catch (err) {
        next(err);
    }
};

exports.get_user_by_id = async (req, res, next) => {
    try {
        const user = await User.findByPk(req.params.userId, {
            attributes: { exclude: ['mot_pass'] }
        });
        if (!user) {
            return next(user_not_exist);
        }

        return res.json(user);
    } catch (err) {
        next(err);
    }
};

exports.get_user_by_username = async (req, res, next) => {
    try {
        const user = await findUserByUsername(req.params.username);
        if (!user) {
            return next(user_not_exist);
        }

        return res.json(user);
    } catch (err) {
        next(err);
    }
};

exports.get_user_reservations = async (req, res, next) => {
    try {
        const user = req.user;

        if (!user) {
            return next(user_unauthenticated);
        }

        const reservations = await Res.findAll({
            where: {
                userId: user.id,
            },
            include: [Serv, Zone]
        });

        return res.json(reservations);

    } catch (err) {
        return next(err);
    }
};

exports.get_user_devis = async (req, res, next) => {
    try {
        const user = req.user;

        if (!user) {
            return next(user_unauthenticated);
        }

        const devis = await Devis.findAll({
            where: {
                userId: user.id,
            }
        });

        return res.json(devis);

    } catch (err) {
        return next(err);
    }
};


const findUserByUsername = async (username) => {
    if (username) {
        return await User.findOne({
            where: {
                username: username
            },
            attributes: { exclude: ['mot_passe'] },
        });
    }

    return null;
};
