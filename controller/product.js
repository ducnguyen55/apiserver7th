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
	const {id ,type ,name ,url ,price} = req.body;
    const numberproduct = await Product.find();
    const product = new Product(
        {
            id:numberproduct[numberproduct.length-1].id + 1,
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
    try {
        const updateProduct = await Product.updateOne(
            { id: req.body.id },
            {
                $set: {
                    name: req.body.name,
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