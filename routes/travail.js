const router = require('express').Router();
const travailControllers = require('../controllers/travail');

router
    .route('/')
    .get(travailControllers.get_all)
    .post(travailControllers.create_travail);

router.post('/:travailId/update', travailControllers.update_travail);

router.get('/by_name/:panneName', travailControllers.get_by_name);

router.get('/:travailId', travailControllers.get_by_id);

router
    .route('/:travailId/materiel/:materielId')
    .post(travailControllers.add_travail_material)
    .get(travailControllers.get_all_travail_material);

router.post('/:travailId/materiel/:materielId/remove', travailControllers.remove_travail_material);


router.post('/categories/:categorieId/bulk', travailControllers.set_travail_categorie);


module.exports = router;