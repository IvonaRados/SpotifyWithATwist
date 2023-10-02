const { Int32 } = require("mongodb");
const mongoose = require("mongoose");




const ComposerScheme = new mongoose.Schema({
    name:String,
    email:String,
    password:String,
    img:String,
    role:String,
    totalLikes: Number,
    totalSongs:Number,
    flag:String,
});

module.exports = mongoose.model("Composer", ComposerScheme);

