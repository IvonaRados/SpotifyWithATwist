const Playlist = require("../Models/Playlist")


async function getAllPlaylist(req, res) {
  try {
    const result = await Playlist.find();
    res.json(result);
  } catch (error) {
    res.status(404).send(error);
  }
}

async function getPlaylistById(req, res) {
  try {
    const playlist = await Playlist.findById(req.params.id);
    res.json(playlist);
  } catch (error) {
    res.status(404).send(error);
  }
}

async function createPlaylist(req, res) {
  try {
    const playlist = Playlist(req.body);
    await playlist.save();
    res.status(201).send("Uspijesno dodano");
  } catch (error) {
    res.status(404).send(error);
  }
}

async function editPlaylist(req, res) {
  try {
    const {name, songs, user} = req.body;
    const playlist = await Playlist.findByIdAndUpdate(req.params.id ,{name: name, songs: songs, 
                          user: user});
    res.json(playlist);
  } catch (error) {
    res.status(404).send(error);
  }
}

async function editPlaylistPublicPrivate(req, res) {
  try {
    const flag = req.body;
    const playlist = await Playlist.findByIdAndUpdate(req.params.id ,{flag: flag.flag});
    res.json(playlist);
  } catch (error) {
    res.status(404).send(error);
  }
}

async function deletePlaylist(req, res) {
  try {
    Playlist.findByIdAndDelete(req.params.id, (err) =>{
      if(err){
          console.log(err);
      }
   });
    res.status(201).send("Uspijesno izbrisano");
  } catch (error) {
    res.status(404).send(error);
  }
}


module.exports = { getAllPlaylist, createPlaylist, getPlaylistById, editPlaylist, editPlaylistPublicPrivate, deletePlaylist };
