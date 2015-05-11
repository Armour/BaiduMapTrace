(function() {
	var CarSchema, Schema, mongoose;

	mongoose = require('mongoose');

	Schema = mongoose.Schema;

	CarSchema = new Schema({
		Source: String,
		Latitude: Number,
		Longitude: Number,
		Name: String,
		Time: Date,
		Speed: Number,
		Course: Number,
		Altitude: Number,
		Comment: String
	});

	mongoose.model('Car', CarSchema);

}).call(this);
