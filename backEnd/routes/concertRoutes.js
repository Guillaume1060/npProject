const express = require('express');

const concertController = require('../controllers/concertController');

const router = express.Router();

// router.param('id', tourController.checkID);

// create a checkBody function
// check if body contains the name and the price property
// if not, send back 400 (bad request)
// add it to the post handler stack

router.
    route('/CarlaT_concerts')
    .get(concertController.aliasCarlaTOnly, concertController.getAllConcerts)

router
    .route('/')
    .get(concertController.getAllConcerts)
    .post(concertController.createConcert)

router
    .route('/:id')
    .get(concertController.getConcert)
    .patch(concertController.updateConcert)
    .delete(concertController.deleteConcert)

module.exports = router;