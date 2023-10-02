const mongoose = require("mongoose");

const {Schema} = mongoose;



const FavoritesSchema = new Schema(
    {
    name: {type:String},
    song_key: {type:String},
    name_composer: {type:String},
    img: {type:String},
    user: {
        type: String,
        ref: "User",
        },
    
    composer: {
        type: String,
        ref: "Composer",
        },
    } 
    
);




module.exports = mongoose.model("Favorites", FavoritesSchema)