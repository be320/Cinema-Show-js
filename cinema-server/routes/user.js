const express = require('express');
const path = require('path');
const router = express.Router();
const usersController = require('../controllers/users');
const { body } = require('express-validator/check')
const User = require('../models/user');



router.post('/signup',[
    body('email').isEmail().withMessage('Please Enter a valid Email').custom((value, {req})=>{
       return  User.findOne({
            where: {email: value}
        }).then((entries)=>{
            if(entries){
            console.log(entries)
             return Promise.reject('E-mail address already exists !')
            }
        })
    }).normalizeEmail(),
    body('password').trim().isLength({min:5}),
    body('name').notEmpty()
], usersController.addUser);

module.exports = router;