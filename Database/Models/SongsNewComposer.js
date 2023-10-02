const { Int32 } = require("mongodb");
const mongoose = require("mongoose");

const {Schema} = mongoose;


const songsNewComposerSchema = new Schema(
    {
    name:String,
    img:String,
    likes:Number,
    flag:String,
    date:String,
    nameofcomposer:String,
    composer: {
        type: String,
        ref: "Composer",
        },
    
    }
);

module.exports = mongoose.model('SongsNewComposer', songsNewComposerSchema);