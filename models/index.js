var mongoose = require("mongoose");

mongoose.connect("mongodb://localhost/giftcard");
mongoose.set("debug", true);

module.exports.Giftcard = require("./giftcard");