const mongoose = require("mongoose");

const flightSchema = new mongoose.Schema({
  userId: { type: mongoose.Schema.Types.ObjectId, ref: "User", required: true }, // Add userId field
  flightNumber: String,
  departureCity: String,
  arrivalCity: String,
  departureDate: Date,
  arrivalDate: Date,
  additionalInfo: String,
});

const Flight_model = mongoose.model("Flight", flightSchema);
module.exports = Flight_model;
