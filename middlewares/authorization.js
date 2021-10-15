const jwt = require('jsonwebtoken');
const db = require('../models');
const User = db.user;

exports.set_req_user = async (req, res, next) => {
    try {
        const authHeader = req.headers['authorization'];

        const token = authHeader && authHeader.split(' ')[1];

        if (!token) {
            return next();
        }

        return jwt.verify(token, process.env.ACCESS_TOKEN_SECRET, async (error, user) => {
            if (error) {
                if (error.message === "jwt expired") {
                    return next();
                }
                return next(error);
            }

            const u = await User.findByPk(user.id, {
                attributes: {
                    exclude: ['mot_passe']
                }
            });

            req.user = u;
            return next();
        });
    } catch (error) {
        next(error);
    }
};

exports.authenticationToken = async (req, res, next) => {
    const authHeader = req.headers['authorization'];

    const token = authHeader && authHeader.split(' ')[1];

    if (!token) {
        return next({
            status: 401,
            message: 'Aucun utilisateur connecté'
        });
    }

    jwt.verify(token, process.env.ACCESS_TOKEN_SECRET, async (error, user) => {
        if (error) {
            return next(error);
        }

        const u = await User.findByPk(user.id, {
            attributes: {
                exclude: ['mot_passe']
            }
        });
        req.user = u;
        next();
    });

};