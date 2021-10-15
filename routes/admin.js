const router = require('express').Router();
const adminControllers = require('../controllers/admin');

router.get('/', adminControllers.get_conected_admin);
router.post('/login', adminControllers.login_admin);
router.patch('/upadate', adminControllers.update_admin);

module.exports = router;