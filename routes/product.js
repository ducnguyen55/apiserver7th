const express = require('express');
const router = express.Router();
const product = require('../controller/product');
const jwt_decode = require('jwt-decode')
const {ProductValidator} = require('../Validator/validator')
const admin = require('../controller/admin');

router.get('/get-data',product.getproduct);
router.post('/insert',admin.IsAdmin,ProductValidator,product.createproduct);
router.patch('/update',admin.IsAdmin,product.updateproduct);
router.delete('/:deleteid',admin.IsAdmin,product.deleteproduct);

module.exports=router;

