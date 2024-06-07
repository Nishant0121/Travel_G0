// models/Package.js
const mongoose = require("mongoose");

const PackageSchema = new mongoose.Schema({
  userId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "User",
    required: true,
  },
  products: [
    {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Product",
    },
  ],
});

const package = mongoose.model("Package", PackageSchema);
module.exports = package;
