const db = require('../../models');
const User = db.user;
const Session = db.user_session;
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const { generateAuthToken } = require('../../services/webToken');

exports.login_user = async (req, res, next) => {
    try {
        const { username, password } = req.body;
        const user = await User.findOne({
            where: {
                username: username
            }
        });

        if (!user) {
            return res.json({
                code: 'auth/failed',
                message: 'Numéro de téléphone ou mot de passe incorect'
            });
        }

        // Check the password
        const same = await bcrypt.compare(password, user.mot_passe);
        if (!same) {
            return res.json({
                code: 'auth/failed',
                message: 'Numéro de téléphone ou mot de passe incorect'
            });
        }

        // Generate the tokens
        const tokens = generateAuthToken({ id: user.id, username: user.username });

        // Create a session
        await Session.create({
            token: tokens.refreshToken
        });

        // Set a cookie
        res.cookie('aid', tokens.refreshToken, { httpOnly: true, sameSite: 'None', secure: true });

        // Set the user
        req.user = user;

        return res.json({
            tokens,
            user
        });
    } catch (err) {
        next({
            status: 401,
            message: err.message
        });
    }
};

exports.refresh_token = async (req, res, next) => {
    try {
        const refreshToken = req.cookies.aid;
        if (!refreshToken) return next({ status: 401, message: 'Aucun utilisateur connecté' });

        jwt.verify(refreshToken, process.env.REFRESH_TOKEN_SECRET, (error, user) => {
            if (error) return next(error);

            let tokens = generateAuthToken(user);

            //{httpOnly: true, samSite: none, secure: true}
            res.cookie('aid', tokens.refreshToken, { httpOnly: true });

            return res.json(tokens);
        });
    } catch (err) {
        next(err);
    }
};

exports.logout_user = async (req, res, next) => {
    try {
        const user = req.user;
        const token = req.headers['authorization'];

        if (!user || !token) {
            return next({
                code: 'failed',
                message: "Aucun utilisateur n\'est connecté."
            });
        }

        await Session.destroy({
            where: {
                token: token
            }
        });

        res.clearCookie('aid');
        req.user = null;

        return res.json({
            message: 'Utilisateur deconnecté'
        });
    } catch (err) {
        next(err);
    }
};