const express = require('express');
const path = require('path');
const router = express.Router();
const reviewController = require('../controllers/reviews');


router.post('/user/:userId/rateMovie/:movieId',reviewController.rateMovie);

router.get('/movieRates/:movieId',reviewController.getMovieRates);

router.post('/user/:userId/rateTV/:tvId',reviewController.rateTV);

router.get('/tvRates/:tvId',reviewController.getTVRates);



module.exports = router;