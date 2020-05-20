const User = require('../models/user')
 
exports.UserValidator = function(req, res, next){
    //name
    req.check('gmail', 'Invalid email.').isEmail();
    req.check('gmail', 'Email is required.').notEmpty();
    req.check('password', 'Password is required.').notEmpty();
    req.check('password', 'Password must be more than 6 characters').isLength({min:6});
 
    //check for errors
    const errors = req.validationErrors();
    if(errors){
        const firstError = errors.map(error => error.msg)[0];
        return res.status(400).json({error: firstError});
    }
    next();
}

exports.ProductValidator = function(req,res,next){
    req.check('price','Invalid price').isInt();
    const errors = req.validationErrors();
    if(errors){
        const firstError = errors.map(error => error.msg)[0];
        return res.status(400).json({error: firstError});
    }
    next();
}