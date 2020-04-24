const express = require('express');
const path = require('path');
const router = express.Router();
const movieController = require('../controllers/movies');
const tvController = require('../controllers/tvs');



router.get('/',(req,res,next)=>
{
    res.send('<h1>Hey Bitch</h1>')
});

router.post('/movie',movieController.addMovie);

router.get('/movies/:page',movieController.getMovies);

router.get('/movie/:id',movieController.getMovie);

router.get('/movies/:query/:page',movieController.searchMovies);

router.post('/tv',tvController.addTV);

router.get('/tvs/:page',tvController.getTVs);

router.get('/tv/:id',tvController.getTV);

router.get('/tvs/:query/:page',tvController.searchTVs);


module.exports = router;