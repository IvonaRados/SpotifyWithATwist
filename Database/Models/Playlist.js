const mongoose = require("mongoose");

const {Schema} = mongoose;

const SongSchema = new Schema(
    {
    api_key:String,
    
    }
);

const PlaylistSchema = new Schema(
    {
    name:String,
    username:String,
    flag:String,
    songs:[SongSchema],
    user: {
        type: String,
        ref: "User",
        },
    
    },
);

module.exports = mongoose.model('Playlist', PlaylistSchema);




