const mongoose = require("mongoose");

const NewsSchema = new mongoose.Schema({
  title_of_article: String,
  text: String,
  composer: {
    type: String,
    ref: "Composer",
  },
  name: String,
  flag:String,
});

module.exports = mongoose.model("News", NewsSchema);