const User = require("../Models/User")

async function getUserById(req, res) {
  try {
    const user = await User.findById(req.params.id);
    res.json(user);
  } catch (error) {
    res.status(404).send(error);
  }
}

async function editUser(req, res) {
  try {
    const new_composers_follow = req.body;
    const user = await User.findByIdAndUpdate(req.params.id,
                {new_composers_follow: new_composers_follow});
    res.json(user);
  } catch (error) {
    res.status(404).send(error);
  }
}

async function editUserPlaylist(req, res) {
  try {
    const playlists_follow = req.body;
    const user = await User.findByIdAndUpdate(req.params.id,
                    {playlists_follow: playlists_follow});
    res.json(user);
  } catch (error) {
    res.status(404).send(error);
  }
}

async function register(req, res) {
    try {
            const user_exsist = await User.find({email: req.body.email})
            console.log(user_exsist);
            if (user_exsist.length>0){
                return res.json("User vec postoji");
            }
            else{
                let user = new User({email: req.body.email, username: req.body.username, 
                  password: req.body.password, role: req.body.role, img: req.body.img});
                user.save();
                return res.json(user);
            }
    } catch (error) {
      res.status(404).send(error);
    }
  }

async function login(req, res) {
    try {
        
        const user = await User.find({email: req.body.email}) 
        if (user.length===0){
            return res.json("User ne postoji");
        }
        if (req.body.password !== user[0].password) {
            return res.send("Wrong password")
        }
        console.log(user[0].email, user[0]._id.toString());
        return res.json({ email: user[0].email, role :user[0].role, id: user[0]._id.toString(), username:user[0].username, img:user[0].img});     
    } catch (error) {
      res.status(404).send(error);
    }
  }

  async function getAllUsers(req, res) {
    try {
      const result = await User.find();
      res.json(result);
    } catch (error) {
      res.status(404).send(error);
    }
  }
module.exports = { login,register, getUserById, editUser, editUserPlaylist, getAllUsers };

  