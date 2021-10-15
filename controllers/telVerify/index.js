const accountSID = process.env.TWILIO_SID;
const tocken = process.env.TWILIO_AUTH_TOKEN;
const verifySID = process.env.TWILIO_VERIFY_SID;
const client = require('twilio')(accountSID, tocken);
const { user_not_exist } = require('../errors/errorObjects');
const { sendToken, verifyToken } = require('../../services/twilio');

const User = require('../../models').user;

exports.request_token = async (req, res, next) => {
    try {
        let tel = req.params.tel;

        if (tel) {
            const u = await User.findOne({
                where: {
                    tel: tel
                }
            });

            if (u) {
                return res.json({
                    code: 'user/exist',
                    message: `Le numéro ${tel} a déjà un compte Mosala maboko`
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
        }

        return res.json({
            code: 'tel/verification_failed',
            message: "Mauvais numéro de téléphone"
        });

    } catch (error) {
        next(error);
    }
};

exports.verify_token = async (req, res, next) => {
    try {
        let tel = req.params.tel;
        const code = req.body.code;

        if (tel && code) {
            const response = await verifyToken(tel, code);

            if (response.error) {
                if (response.error.message === "The requested resource /Services/VAcc0bee6bc27ef08547668989e384eafc/VerificationCheck was not found") {
                    return res.json({
                        code: 'tel/verification_failed1',
                        message: "Mauvais code ou code expiré."
                    });
                } else {
                    return res.json({
                        code: 'tel/verification_failed1',
                        message: response.error.message
                    });
                }

            } else {
                return res.status(200).json({
                    status: response.status
                });
            }
        }

        return res.json({
            code: 'tel/verification_failed',
            message: "Mauvais numéro de téléphone"
        });
    } catch (error) {
        next(error);
    }
};
