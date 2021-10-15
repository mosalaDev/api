const router = require('express').Router();
const reservationControllers = require('../controllers/reservation');

router
    .route('/')
    .post(reservationControllers.create_reservation)
    .get(reservationControllers.get_all);

router.post('/:reservationId/update', reservationControllers.update_reservation);

router.post('/:reservationId/travail/:serviceId', reservationControllers.reservation_add_travail);

router.post('/:reservationId/service/:travailId/remove', reservationControllers.reservation_remove_travail);

router.post('/:reservationId/annuler', reservationControllers.cancel_reservation);

router.post('/annulation/:cancelationId/confirm', reservationControllers.confirm_reservation_cancel);

router.post('/:reservationId/annuler/raison', reservationControllers.add_reason_to_reservation_cancel);

router.get('/:reservationId', reservationControllers.get_one);

router.get('/:reservationId/artisan_qualifie', reservationControllers.get_reservation_qualified_artisan);


module.exports = router;