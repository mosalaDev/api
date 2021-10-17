const db = require('../models');
const Email = db.email;
const { generateToken } = require('../services/webToken');
const router = require('express').Router();

router
    .route('/')
    .get(async (req, res, next) => {
        try {
            const emails = await Emails.findAll();

            return res.json(emails);
        } catch (err) {
            next(err);
        }
    })
    .post(async (req, res, next) => {
        try {
            const data = req.body;

            const exist = await Email.findOne({ where: { email: data.email } });

            if (exist) {
                return res.json({
                    status: 'failed',
                    message: 'Adresse mail déjà enregistré.'
                });
            }

            await Email.create({
                email: data.email
            });

            const token = generateToken(data.email);

            return res.json({
                status: 'success',
                token
            });
        } catch (err) {
            next(err);
        }
    });

module.exports = router;