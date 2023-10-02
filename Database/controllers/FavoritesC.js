const Favorites = require("../Models/Favorites")


async function getAllFavorites(req, res) {
  try {
    const result = await Favorites.find();
    res.json(result);
  } catch (error) {
    res.status(404).send(error);
  }
}
async function createFavorites(req, res) {
  try {
    const favorites = Favorites(req.body);
    await favorites.save();
    res.status(201).send("Uspijesno dodano");
  } catch (error) {
    res.status(404).send(error);
  }
}
async function deleteFavorites(req, res) {
  try {
    Favorites.findByIdAndDelete(req.params.id, (err) =>{
      if(err){
          console.log(err);
      }
   });
    res.status(201).send("Uspijesno izbrisano");
  } catch (error) {
    res.status(404).send(error);
  }
}


module.exports = { getAllFavorites, createFavorites, deleteFavorites };
