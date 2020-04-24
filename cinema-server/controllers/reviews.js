const TVReview = require('../models/tvReview');
const MovieReview = require('../models/movieReview');
const User = require('../models/user');





exports.getTVRates = (req,res,next) => {
    let tvId = req.params.tvId; 

    TVReview.findAll(
        {
            where:{
                tvId: tvId
            },
            include: [User]
        }
    ).then(function(comments) {
        res.status(200).json({
          // success on fetching
          comments:comments
        });  
    });

}


exports.rateTV = (req,res,next) => {
    let userId = req.params.userId;
    let tvId = req.params.tvId; 
    let body = req.body.body;
    let rating = req.body.rating;
    let date = req.body.date;
    TVReview.create({  
      body: body,
      rating: rating,
      date: date,  
      userId: userId,
      tvId: tvId,
    }).then(response => {



        
        res.status(200).json({
          tvId: tvId,
          userId: userId,
          review:response
        });
      }).catch(err => {
         console.log(err)
      });
  }









exports.getMovieRates = (req,res,next) => {
    let movieId = req.params.movieId; 

    MovieReview.findAll(
        {
            where:{
                movieId: movieId
            },
            include: [User]
        }
    ).then(function(comments) {
        res.status(200).json({
          // success on fetching
          comments:comments
        });  
    });

}


exports.rateMovie = (req,res,next) => {
    let userId = req.params.userId;
    let movieId = req.params.movieId; 
    let body = req.body.body;
    let rating = req.body.rating;
    let date = req.body.date;
    MovieReview.create({  
      body: body,
      rating: rating,
      date: date,  
      userId: userId,
      movieId: movieId,
    }).then(response => {
        res.status(200).json({
          movieId: movieId,
          userId: userId,
          review:response
        });
      }).catch(err => {
         console.log(err)
      });
  }