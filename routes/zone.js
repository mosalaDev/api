const router = require('express').Router();
const zoneControllers = require('../controllers/zone');


router
    .route('/')
    .get(zoneControllers.get_all)
    .post(zoneControllers.create_zone);

router.post('/:zoneId/update', zoneControllers.update_zone);

router.get('/by_name/:zoneName', zoneControllers.get_by_name);

router.get('/:zoneId', zoneControllers.get_by_id);

module.exports = router;