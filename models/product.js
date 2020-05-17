const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const ProductSchema = new Schema({
	id: {
		type: Number,
		require: true
	},
	type: {
		type: String,
		require: true
	},
	name: {
		type: String,
		require: true
	},
	url: {
		type: String,
		require: true
	},
	price: {
		type: Number,
		require: true
	}
})

module.exports = product = mongoose.model('Product',ProductSchema)