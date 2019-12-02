const mongoose = require("mongoose");

const urlSchema = mongoose.Schema({
  url: { type: String, required: true, unique: true }
});

const Url = mongoose.model("Url", urlSchema);


module.exports = Url;
