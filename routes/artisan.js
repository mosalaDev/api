const router = require('express').Router();
const artisanControllers = require('../controllers/artisan');

router
    .route('/')
    .get(artisanControllers.get_all_artisans)
    .post(artisanControllers.create_artisan_account);

router.post('/:artisanId/update', artisanControllers.update_artisan);

router.post('/:artisanId/status', artisanControllers.artisan_change_status);

router.post('/:artisanId/activate', artisanControllers.artisan_activate);

router.post('/:artisanId/desactivate', artisanControllers.artisan_desactivate);

router
    .route('/:artisanId/specialites')
    .post(artisanControllers.artisan_add_speciality)
    .get(artisanControllers.get_artisan_specialities);

router
    .get('/:artisanId', artisanControllers.get_by_id);

router
    .get('/by_username/:username', artisanControllers.get_by_username);

router
    .post('/:artisanId/specialites/:panneId/remove', artisanControllers.artisan_remove_speciality);

router.post('/:artisanId/verify_competences', artisanControllers.verify_competences);

router.post('/:artisanId/certificat', artisanControllers.certify);

router.get('/certificat', artisanControllers.get_certifications);

module.exports = router;
