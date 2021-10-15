const db = require('../../models');
const User = db.user;
const Token = db.reset_token;
const bcrypt = require('bcryptjs');
const { sendToken, verifyToken } = require('../../services/twilio');
const { generateToken, verifyToken: verifyWebToken } = require('../../services/webToken');
const { user_not_exist, update_failed } = require('../errors/errorObjects');

exports.request_token = async (req, res, next) => {
    try {
        let tel = req.params.tel;

        if (!tel) {
            return res.json({
                code: 'tel/verification_failed',
                message: "Mauvais numéro de téléphone"
            });
        }

        const u = await User.findOne({
            where: {
                tel: tel
            }
        });

        if (!u) {
            return res.json({
                code: 'user/not_exist',
                message: "Aucun compte correspond à ce numéro"
            });
        }

        const response = await sendToken(tel);

        if (response.error) {
            console.log(error);
            return next({
                code: 'tel/verification_failed',
                message: error.message
            });
        } else {
            return res.status(200).json({
                status: response.status,
            });
        }

    } catch (error) {
        next(error);
    }
};

exports.request_reset_password_token = async (req, res, next) => {
    try {
        let tel = req.params.tel;
        const code = req.body.code;

        const response = await verifyToken(tel, code);

        if (response.error) {
            return next({
                code: 'tel/verification_failed1',
                message: response.error.message
            });
        } else {
            const u = await User.findOne({
                where: {
                    username: tel
                },
                attributes: ['id', 'nom', 'prenom', 'tel']
            });

            if (!u) {
                return next(user_not_exist);
            }

            const t = await Token.findOne({ where: { userId: u.id } });

            if (t) {
                await Token.destroy({
                    where: {
                        id: t.id
                    }
                });
            }

            const token = generateToken(u.id);

            return res.status(200).json({
                status: response.status,
                token: token,
                user: u
            });
        }

    } catch (err) {
        next(err);
    }
};

exports.reset_password = async (req, res, next) => {
    try {
        const token = req.body.token;
        const newPassword = req.body.password;

        verifyWebToken(token, async (err, decoded) => {
            try {
                if (err || !decoded) {
                    return res.json({
                        err,
                        decoded
                    });
                }

                const id = decoded.data.id;

                const u = await User.findByPk(id);

                if (!u) {
                    return next(user_not_exist);
                }

                const pass = await bcrypt.hash(newPassword, 10);

                const result = await User.update({ mot_passe: pass }, {
                    where: {
                        id: u.id
                    },
                });

                if (result[0] === 1) {
                    return res.json({
                        status: 'success',
                        message: 'Mot de passe modifié.'
                    });
                } else {
                    return next(update_failed);
                }
            } catch (error) {
                next(error);
            }
        });

    } catch (err) {
        next(err);
    }
};