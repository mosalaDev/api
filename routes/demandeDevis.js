const router = require('express').Router();
const demandeDevisControllers = require('../controllers/demande/devis');

/**
 * Demande devis routes
 */
router
    .route('/')
    .post(demandeDevisControllers.create_demande)
    .get(demandeDevisControllers.get_all);

router.post('/:demId/update', demandeDevisControllers.update_prestation);

router.get('/:demId', demandeDevisControllers.get_one);


module.exports = router;