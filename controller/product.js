const express = require('express');
const router = express.Router();
var MongoClient = require('mongodb').MongoClient;
const cors = require('cors');
const Product = require('../models/product');

exports.getproduct = async (req,res) => {
    try 
    {
        const token= req.header;
        console.log(token);
        const product = await Product.find();
        res.json(product);
    } 
    catch (err) {
        res.json({ message: err })
    }
}

exports.createproduct = async (req,res) => {
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

exports.updateproduct = async (req, res) => {
	console.log(req.body);
    try {
        const updateProduct = await Product.updateOne(
            { id: req.body.id },
            {
                $set: {
                	type: req.body.type,
                    name: req.body.name,
                    url: req.body.url,
                    price: req.body.price
                }
            }
        );
        res.json(updateProduct);
    } catch (err) {
        res.json({ message: err })
    }
}

exports.deleteproduct = async (req, res) => {
    try {
        await Product.deleteOne({ id: req.params.deleteid });
        res.json({ message: 'Product deleted' });
    } catch (err) {
        res.json({ message: err })
    }
};