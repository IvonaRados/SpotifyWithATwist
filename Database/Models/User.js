const mongoose = require("mongoose");
const {Schema} = mongoose;

const ComposersFollow = new Schema(
    {
    composer: {
        type: String,
        ref: "Composer",
        },
    }
);
const PlaylistsFollow = new Schema(
    {
    playlist: {
        type: String,
        ref: "Playlist",
        },
    }
);
const userSchema = new Schema(
    {
    email:{type:String, unique: true, dropDups: true, required:true},
    password:{type:String, required: true},
    username:String,
    img:String,
    role:{type:String},
    playlists_follow: [PlaylistsFollow],
    new_composers_follow: [ComposersFollow],
    
    }
);
module.exports = mongoose.model('User', userSchema);