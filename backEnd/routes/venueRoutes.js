const express = require('express');

const venueController = require('../controllers/venueController');

const router = express.Router();

router
    .route('/venue-stats')
    .get(venueController.getVenueStats);

router
    .route('/monthly-plan/:year')
    .get(venueController.getMonthlyPlan);

router
    .route('/')
    .get(venueController.getAllVenues)
    .post(venueController.createVenue);

router
    .route('/:id')
    .get(venueController.getVenue)
    .patch(venueController.updateVenue)
    .delete(venueController.deleteVenue)

module.exports = router;