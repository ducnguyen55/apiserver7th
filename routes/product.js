const express = require('express');
const router = express.Router();
var MongoClient = require('mongodb').MongoClient;
const url = 'mongodb+srv://we00054643:1Licynduy@shopping-nbfge.mongodb.net/test?retryWrites=true&w=majority';

router.get('/get-data', function(req,res,next) {
	MongoClient.connect(url, function(err,db){
		if(err) throw err;
		var dbo = db.db("Shopping");
		dbo.collection("Product").find({}).toArray(function(err,result){
			if (err) throw err;
			res.send(result);
			db.close();
		});
	});
});


module.exports=router;