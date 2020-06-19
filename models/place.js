var mongoose = require("mongoose");

var placeSchema = new mongoose.Schema({
    name: String,
    image: String,
    description: String,
    isVisited:Boolean,
    isBucketlist:Boolean,
    date: String,
	username: String
});

module.exports = mongoose.model("Place",placeSchema);