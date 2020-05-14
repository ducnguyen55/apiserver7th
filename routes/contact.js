const express = require('express');
const router = express.Router();
var MongoClient = require('mongodb').MongoClient;
const url = 'mongodb+srv://we00054643:1Licynduy@shopping-nbfge.mongodb.net/test?retryWrites=true&w=majority';

router.get('/get-data', function(req,res,next) {
	MongoClient.connect(url, function(err,db){
		if(err) throw err;
		var dbo = db.db("Shopping");
		dbo.collection("Contact").find({}).toArray(function(err,result){
			if (err) throw err;
			res.send(result);
			db.close();
		});
	});
});
router.post('/insert',function(req,res,next) {
	MongoClient.connect(url, function(err, db) {
		if (err) throw err;
		var dbo = db.db("Shopping");
		var myobj = 
		{ 	name: req.body.name,
			gmail: req.body.gmail,
			message: req.body.message };
		dbo.collection("Contact").insertOne(myobj, function(err, res) {
		if (err) throw err;
			console.log("1 document inserted");
			db.close();
		});
		res.send("Create Success !!");
	});
});

router.post('/',(req,res)=>{
    console.log(req.body);
    res.send(req.body);
});

module.exports=router;