const router = require('express').Router();
const authControllers = require('../controllers/auth');

router.post('/login', authControllers.login_user);

router.post('/refresh_token', authControllers.refresh_token);

router.delete('/logout', authControllers.logout_user);

router.get('/', (req, res, next) => {
    try {
        const user = req.user;

        if (!user) {
            return res.json({
                code: 'user/unauthenticated',
                message: 'aucun utilisateur connecté'
            });
        }

        return res.json(user);
    } catch (error) {
        next(error);
    }
});

module.exports = router;