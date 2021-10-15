const router = require('express').Router();
const authControllers = require('../controllers/auth');

router.post('/login', authControllers.login_user);

router.post('/refresh_token', authControllers.refresh_token);

router.delete('/logout', authControllers.logout_user);

module.exports = router;