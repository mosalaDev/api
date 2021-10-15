const router = require('express').Router();
const gammeControllers = require('../controllers/gammeTravaux');


router
    .route('/')
    .get(gammeControllers.get_all)
    .post(gammeControllers.create_gamme_travaux);

router.post('/:gammeId/update', gammeControllers.update_gamme_travaux);

router.get('/by_name/:gammeName', gammeControllers.get_by_name);

router.get('/:gammeId', gammeControllers.get_by_id);

router.get('/:gammeId/travaux', gammeControllers.get_gamme_all_travaux);

module.exports = router;