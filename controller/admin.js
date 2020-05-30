const express = require('express');
const router = express.Router();
var MongoClient = require('mongodb').MongoClient;
const cors = require('cors');
const jwt = require('jsonwebtoken');
const jwt_decode = require('jwt-decode');
const bcrypt = require('bcrypt');
const User = require('../models/user');

exports.IsAdmin = (req,res,next) => {
	console.log(req);
    const Data = jwt_decode(req.headers.api_key);
    console.log(Data.role);
    if(Data.role=='admin')
    	return next();
	else {
        res.status(401).json({message: "You are not admin"});
        console.log("You are not admin");
    }
}