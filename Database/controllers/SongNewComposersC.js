const SongNewComposer = require("../Models/SongsNewComposer")


async function getAllSongNewComposer(req, res) {
  try {
    const result = await SongNewComposer.find();
    res.json(result);
  } catch (error) {
    res.status(404).send(error);
  }
}

async function getSongById(req, res) {
  try {
    const song = await SongNewComposer.findById(req.params.id);
    res.json(song);
  } catch (error) {
    res.status(404).send(error);
  }
}

async function createSong(req, res) {
  try {
    const song = SongNewComposer(req.body);
    await song.save();
    res.status(201).send("Uspijesno dodano");
  } catch (error) {
    res.status(404).send(error);
  }
}

async function deleteSong(req, res) {
  try {
    SongNewComposer.findByIdAndDelete(req.params.id, (err) =>{
      if(err){
          console.log(err);
      }
   });
    res.status(201).send("Uspijesno izbrisano");
  } catch (error) {
    res.status(404).send(error);
  }
}
async function editSong(req, res) {
  try {
    const likes = req.body;
    const song = await SongNewComposer.findByIdAndUpdate(req.params.id ,{likes: likes.likes});
    res.json(song);
  } catch (error) {
    res.status(404).send(error);
  }
}

async function editSongActivate(req, res) {
  try {
    const flag = req.body;
    const song = await SongNewComposer.findByIdAndUpdate(req.params.id ,{flag: flag.flag});
    res.json(song);
  } catch (error) {
    res.status(404).send(error);
  }
}

module.exports = { getAllSongNewComposer, createSong, deleteSong, editSong, editSongActivate, getSongById };
