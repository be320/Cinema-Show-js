const User = require('../models/user')

exports.addUser = (req,res,next) => 
{
    User.create({
    name: req.body.name,
    email: req.body.email,
    password: req.body.password,
    }).then(result=>{
        res.status(201).json({ // success on create
            message: 'User added Successfully',
            user:{user: req.body}
        });
    }).catch(err => console.log(err))   
}
