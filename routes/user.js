const router = require('express').Router();
const { user_unauthenticated } = require('../controllers/errors/errorObjects');
const userControllers = require('../controllers/user');
const telVerifyControllers = require('../controllers/telVerify');
const passwordRessetControllers = require('../controllers/user/passwordResset');
const db = require('../models');
const Res = db.reservation;
const Devis = db.demande_devis;

router.post('/signup', userControllers.create_user);

router.post('/login', userControllers.login_user);

router.get('/logout', userControllers.logout_user);

router.post('/update', userControllers.update_user);

router.post('/update_password', userControllers.update_password);

router.get('/reservations', userControllers.get_user_reservations);

router.get('/devis', userControllers.get_user_devis);

/**
 * Phone number verification
 */
router.post('/verify/:tel', telVerifyControllers.verify_token);

router.get('/verify/:tel', telVerifyControllers.request_token);

/**
 * Password resset
 */
router.get('/reset_password/:tel/request_code', passwordRessetControllers.request_token);

router.post('/reset_password/:tel/resset_password_token', passwordRessetControllers.request_reset_password_token);

router.post('/reset_password', passwordRessetControllers.reset_password);

module.exports = router;
