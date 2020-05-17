const express = require('express');
const router = express.Router();
var MongoClient = require('mongodb').MongoClient;
const cors = require('cors');
const Product = require('../models/product');

exports.getproduct = async (req,res) => {
    try 
    {
        const product = await Product.find();
        res.json(product);
    } 
    catch (err) {
        res.json({ message: err })
    }
}

exports.createproduct = async (req,res) => {
	res.send("AAAAAAAA");
	const {id ,type ,name ,url ,price} = req.body;

    const product = new Product(
        {
            id:id,
            type:type,
            name:name,
            url:url,
            price:price
        }
    );
    try {
        const saveProduct = await product.save();
        res.json(saveProduct);
    } catch (err) {
        res.json({ message: err })
    }
}