const router = require('express').Router();
const specControllers = require('../controllers/spec');

router
    .route('/')
    .get(specControllers.get_all)
    .post(specControllers.create_spec);

router.post('/:specId/update', specControllers.update_spec);

router.get('/by_libele/:libele', specControllers.get_by_libele);

router.get('/by_type/:type', specControllers.get_by_type);

router.get('/:specId', specControllers.get_by_id);

module.exports = router;