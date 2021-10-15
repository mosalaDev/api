const router = require('express').Router();
const prestationController = require('../controllers/prestation');


router
    .route('/')
    .get(prestationController.get_all)
    .post(prestationController.create_prestation);

router.post('/:prestationId/materiel', prestationController.prestation_start);

router.post('/:prestationId/materiel', prestationController.prestation_add_material);

router.post('/:prestationId/materiel/:materialId/remove', prestationController.prestation_remove_material);

router.post('/:prestationId/panne', prestationController.prestation_add_panne);

router.post('/:prestationId/panne/:panneId/remove', prestationController.prestation_remove_panne);

router.get('/:prestationId/devis', prestationController.prestation_devis);

router.get('/:prestationId', prestationController.get_one);

module.exports = router;