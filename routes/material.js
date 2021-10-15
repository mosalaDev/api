const router = require('express').Router();
const materialControllers = require('../controllers/material');

router
    .route('/')
    .get(materialControllers.get_all)
    .post(materialControllers.create_material);

router.post('/:materialId/update', materialControllers.update_material);

router.get('/by_name/:materialName', materialControllers.get_by_name);

router.get('/:materialId', materialControllers.get_by_id);

router.get('/:materialId/specs', materialControllers.get_material_specs);

module.exports = router;