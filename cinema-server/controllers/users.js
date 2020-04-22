const User = require("../models/user");
const { validationResult } = require("express-validator/check");
const bcrypt = require("bcryptjs");
const jwt = require('jsonwebtoken');
const Movie = require("../models/movie");
const Actor = require('../models/actor');
const Genre = require('../models/genre');
const TV = require("../models/tv");
const UserLikeMovie = require("../models/userLikeMovie");
const UserLikeTV = require("../models/userLikeTV");



exports.likeMovie = (req,res,next) => {
  let userId = req.params.userId;
  let movieId = req.params.movieId; 
  UserLikeMovie.create({
    userId: userId,
    movieId: movieId,
  }).then(response => {

      res.status(200).json({
        movieId: movieId,
        userId: userId
      });
    }).catch(err => {
       console.log(err)
    });
}


exports.login = (req, res, next) => {
  const email = req.body.email;
  const password = req.body.password;
  let loadedUser;
  User.findOne({
    where: {email: email}
}).then((user)=>{
  if(!user)
  {
    const error = new Error('User with this email not found !');
    error.statusCode = 401; //not authenticated
    throw error;
  }
  loadedUser = user;
  return bcrypt.compare(password,user.password) //this return promise
    
    }).then( isEqual => {  //another then for bcrypt promise
      if(!isEqual){
        const error = new Error('Wrong Password !');
        error.statusCode = 401;
        throw error;
      }

      const token = jwt.sign({id: loadedUser.id},'somesupersecretsecret' , {expiresIn: '1h'} );

      res.status(200).json({
        token: token,
        userId: loadedUser.id
      });


    }).catch(err =>{
      if(!err.statusCode)
        err.statusCode = 500;
      next(err)
    })
}


exports.getUser = (req,res,next) => {
  let id = req.params.id;

  User.findByPk(id,{ include: [Actor,Genre,Movie,TV] }).then(function(user) {
    res.status(200).json({
      // success on fetching
      user:user
    });  
});
}





exports.addUser = (req, res, next) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    const error = {};
    error.statusCode = 422;
    error.data = errors.array();
    res.status(422).json({
        // success on create
        message: "Failed to add User",
        error: error
      });
      throw error;
  }

  const name = req.body.name;
  const email = req.body.email;
  const password = req.body.password;
  bcrypt
    .hash(password, 12)
    .then(hashedPW => {
      User.create({
        name: name,
        email: email,
        password: hashedPW
      })
        .then(user => {
          const token = jwt.sign({id: user.id},'somesupersecretsecret' , {expiresIn: '1h'} );

          res.status(200).json({
            token: token,
            userId: user.id
          });
        })
        .catch(err => {
           console.log(err)
        });
    })
    .catch(err => {
      if (!err.statusCode) {
        err.statusCode = 500;
      }
      next(err);
    });

};
