const express = require('express');
const path = require('path');
const router = express.Router();
const usersController = require('../controllers/users');
const { body } = require('express-validator/check')
const User = require('../models/user');
const reviewController = require('../controllers/reviews');



router.post('/signup',[
    body('name').notEmpty().withMessage('Name Field is empty'),
    body('email').notEmpty().withMessage('Email Field is empty').isEmail().withMessage('Not Valid Email').custom((value, {req})=>{
       return  User.findOne({
            where: {email: value}
        }).then((entries)=>{
            if(entries){
            console.log(entries)
             return Promise.reject('E-mail address already exists !')
            }
        })
    }).normalizeEmail(),
    body('password').notEmpty().withMessage('Password Field is empty').trim().isLength({min:5}).withMessage('Minimum Password Length is 5 characters'),
   
], usersController.addUser);

router.post('/login',usersController.login);

router.get('/user/:id',usersController.getUser);

router.post('/user/:userId/likeMovie/:movieId',usersController.likeMovie);



module.exports = router;