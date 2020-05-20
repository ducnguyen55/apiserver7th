const express = require('express');
const router = express.Router();
const product = require('../controller/product');
const jwt_decode = require('jwt-decode')

function IsAdmin(req,res,next){
    Data = jwt_decode(req.body.token);
    if(Data.role=='admin')
    	return next();
	else {
        res.json({message: "You are not admin"});
        console.log("You are not admin");
    }
}
router.get('/get-data',product.getproduct);
router.post('/insert',IsAdmin,product.createproduct);
router.patch('/update',IsAdmin,product.updateproduct);
router.delete('/:deleteid',IsAdmin,product.deleteproduct);

module.exports=router;

