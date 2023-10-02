const Composer = require("../Models/Composer");

async function getAllComposers(req, res) {
  try {
    const result = await Composer.find();
    res.json(result);
  } catch (error) {
    res.status(404).send(error);
  }
}

async function editComposer(req, res) {
  try {
    const totalSongs = req.body;
    const totalLikes= req.body;
    const composer = await Composer.findByIdAndUpdate(req.params.id ,{totalSongs: 
      totalSongs.totalSongs, totalLikes: totalLikes.totalLikes});
    res.json(composer);
  } catch (error) {
    res.status(404).send(error);
  }
}

async function editComposerActivate(req, res) {
  try {
    const flag = req.body;
    const composer = await Composer.findByIdAndUpdate(req.params.id ,{flag: flag.flag});
    res.json(composer);
  } catch (error) {
    res.status(404).send(error);
  }
}

async function getComposerById(req, res) {
  try {
    const artist = await Composer.findById(req.params.id);
    res.json(artist);
  } catch (error) {
    res.status(404).send(error);
  }
}


async function registerComposer(req, res) {
    try {
            const user_exsist = await Composer.find({email: req.body.email})
            if (user_exsist.length>0){
                return res.json("User vec postoji");
            }
            else{
                let composer = new Composer({name: req.body.name, totalLikes: req.body.totalLikes, totalSongs: req.body.totalSongs, 
                  email: req.body.email, password: req.body.password, img: req.body.img, role: req.body.role, flag: req.body.flag});
                composer.save();
                return res.json(composer);
            }
    } catch (error) {
      res.status(404).send(error);
    }
  }


async function loginComposer(req, res) {
    try {
        const composer = await Composer.find({email: req.body.email}) 
        if (composer.length===0){
            return res.json("User ne postoji");
        }
        if (req.body.password !== composer[0].password) {
            return res.send("Wrong password")
        }
        console.log(composer[0].email, composer[0]._id.toString(), 
        composer[0].name, composer[0].role,);
        return res.json({ email:composer[0].email, name: composer[0].name, 
          role:composer[0].role, img:composer[0].img, id: composer[0]._id.toString()});
    } catch (error) {
      res.status(404).send(error);
    }
  }

module.exports = { loginComposer,registerComposer, getAllComposers, getComposerById, editComposer, editComposerActivate };

  