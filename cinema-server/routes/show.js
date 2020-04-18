const express = require('express');
const path = require('path');
const router = express.Router();
const movieController = require('../controllers/movies');


router.get('/',(req,res,next)=>
{
    res.send('<h1>Hey Bitch</h1>')
});

router.post('/movie',movieController.addMovie);


module.exports = router;