const router = require('express').Router();
const categorieTravailControllers = require('../controllers/categorieTravail');

router
    .route('/')
    .get(categorieTravailControllers.get_all)
    .post(categorieTravailControllers.create_categorie_travail);

router.post('/:categorieId/update', categorieTravailControllers.update_categorie_travail);

router.get('/by_name/:categorieName', categorieTravailControllers.get_by_name);

router.get('/:categorieId', categorieTravailControllers.get_by_id);

router.get('/:categorieId/travaux', categorieTravailControllers.get_categorie_travaux);

router.get('/:categorieId/service/:serviceId/travaux', categorieTravailControllers.get_categorie_travaux_by_service);

module.exports = router;