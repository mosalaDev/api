const router = require('express').Router();
const serviceController = require('../controllers/service');


router
    .route('/')
    .get(serviceController.get_all)
    .post(serviceController.create_service);

router.get('/all_data', serviceController.get_all_with_travail);

router.post('/:serviceId/update', serviceController.update_service);

router.get('/by_name/:serviceName', serviceController.get_by_name);

router.get('/:serviceId', serviceController.get_by_id);

router.get('/:serviceId/travaux', serviceController.get_service_works);

router.get('/:serviceId/materiels', serviceController.get_service_materials);

module.exports = router;