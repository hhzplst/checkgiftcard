var mongoose = require("mongoose");
mongoose.set("debug", true);

var gcSchema = mongoose.Schema({
  code: {
    type: String,
    required: true,
    unique: true
  },
  value: {
    type: Number,
    min: 0,
    required: true
  },
  expiration: {
    type: Date,
    required: true
  }

});

var Giftcard = mongoose.model("Giftcard", gcSchema);

module.exports = Giftcard;