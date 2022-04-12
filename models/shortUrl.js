const mongoose = require("mongoose");
const shortId = require("shortid");
const shortid = require("shortid");

//to create shortid for the link

//Schema to be genreated every time we create new shoryid
const shortUrlSchema = new mongoose.Schema({
  full: {
    type: String,
    required: true,
  },
  short: {
    type: String,
    required: true,
    default: shortId.generate,
  },
  clicks: {
    type: Number,
    required: true,
    default: 0,
  },
});

//name of the model is ShortUrl
module.exports = mongoose.model("ShortUrl", shortUrlSchema);
