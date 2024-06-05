const mongoose = require("mongoose");

const PlaceSchema = new mongoose.Schema({
  userId: { type: mongoose.Schema.Types.ObjectId, ref: "User", required: true }, // Add userId field
  name: { type: String, required: true },
  location: { type: String, required: true },
  description: { type: String, required: true },
  price: { type: Number, required: true },
  imgurl: { type: String, require: true },
  category: { type: String, required: true }, // Add category field
});

const place_model = mongoose.model("Place", PlaceSchema);
module.exports = place_model;
