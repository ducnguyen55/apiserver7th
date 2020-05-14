const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const UserSchema = new Schema({
	full_name: {
		type: String
	},
	gmail: {
		type: String,
		require: true
	},
	password: {
		type: String,
		require: true
	},
	date: {
		type: Date,
		default: Date.now
	}
})

module.exports = user = mongoose.model('User',UserSchema)