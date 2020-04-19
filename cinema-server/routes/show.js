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

router.post('/tv',tvController.addTV);


module.exports = router;