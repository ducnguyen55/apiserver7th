const express = require('express');
const router = express.Router();
const product = require('../controller/product');

router.get('/get-data',product.getproduct);
router.post('/insert',product.createproduct);
router.patch('/update',product.updateproduct);
router.post('/delete',product.deleteproduct);

module.exports=router;

