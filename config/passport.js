const LocalStrategy = require('passport-local').Strategy;
const db = require('../models');
const Admin = db.admin;
const bcrypt = require('bcryptjs');

module.exports = (passport) => {
    passport.use(new LocalStrategy(
        (username, password, done) => {
            Admin
                .findOne({
                    where: {
                        username: username
                    }
                })
                .then(async (user) => {
                    if (!user) {
                        return done(null, false, { message: 'Numéro de téléphone ou mot de passe incorect' });
                    }

                    const same = await bcrypt.compare(password, user.mot_passe);
                    if (!same) {
                        return done(null, false, { message: 'Numéro de téléphone ou mot de passe incorect' });
                    }

                    return done(null, {
                        id: user.id,
                        username: user.username,
                        tel: user.tel,
                        email: user.email,
                        nom: user.nom,
                        postnom: user.postnom,
                        prenom: user.prenom,
                        sexe: user.sexe,
                        ville: user.ville,
                        commune: user.commune,
                        quartier: user.quartier,
                        account_type: user.account_type,
                        createdAt: user.createdAt,
                        updatedAt: user.updatedAt,
                    });
                })
                .catch(err => {
                    done(err);
                });
        }
    ));

    passport.serializeUser((user, done) => done(null, user.id));
    passport.deserializeUser((id, done) => {
        User.findByPk(id, {
            attributes: { exclude: 'mot_passe' }
        }).then((user) => {
            done(null, user);
        }).catch(err => done(err, null));
    });
};