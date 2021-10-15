const router = require('express').Router();
const affectationControllers = require('../controllers/affectation');

router
    .route('/')
    .post(affectationControllers.create_affectation);

module.exports = router;