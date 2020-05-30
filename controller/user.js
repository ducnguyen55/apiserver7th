const express = require('express');
const router = express.Router();
var MongoClient = require('mongodb').MongoClient;
const cors = require('cors');
const jwt = require('jsonwebtoken');
const bcrypt = require('bcrypt');
const User = require('../models/user');


process.env.SECRET_KEY='secret';

exports.register = (req,res) => {
	const today = new Date();
	const UserData = {
		full_name: req.body.full_name,
		gmail: req.body.gmail,
		password: req.body.password,
		created: today,
		role: 'user'
	};
	User.findOne({
		gmail: req.body.gmail
	})
	.then(user => {
		if(!user) {
			bcrypt.hash(req.body.password, 10, (err,hash) => {
				UserData.password = hash;
				User.create(UserData)
				.then(user => {
					res.json({status: user.gmail + ' registered!'})
				})
				.catch(err => {
					res.send('error :' + err);
				});
			})
		}else{
			res.json({error: 'User already exists'})
		}
	})
	.catch(err => {
		res.send('error: ' + err)
	})
};


exports.login = (req,res) => {
	User.findOne({
		gmail: req.body.gmail
	})
	.then(user => {
		if(user) {
			if(bcrypt.compareSync(req.body.password, user.password)) {
				const payload = {
					_id: user._id,
					full_name: user.full_name,
					gmail: user.gmail,
					role: user.role
				}
				let token = jwt.sign(payload, process.env.SECRET_KEY, {
					expiresIn: 1440
				})
				res.send(token);
			}else{
				res.status(400).json({error: "Wrong password"})
			}
		}else{
			res.json({error: "User does not exist"})
		}
	})
	.catch(err => {
		res.send('error: ' + err)
	})
};
