const express = require('express');

const concertController = require('../controllers/concertController');

const router = express.Router();

// router.param('id', tourController.checkID);

// create a checkBody function
// check if body contains the name and the price property
// if not, send back 400 (bad request)
// add it to the post handler stack


router
    .route('/')
    .get(concertController.getAllConcerts)
// .post(concertController.createTour)

// router
//     .route('/:id')
//     .get(concertController.getTour)
//     .patch(concertController.updateTour)
//     .delete(concertController.deleteTour)

module.exports = router;