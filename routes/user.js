const express = require('express');
const router = express.Router();
const user = require('../controller/user');
const {UserValidator} = require('../Validator/validator')

 
router.post('/register',UserValidator,user.register);
router.post('/login',user.login);
router.get('/logout',user.logout);

module.exports=router;