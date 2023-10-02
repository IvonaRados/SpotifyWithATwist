const express = require("express");
const router = express.Router();

const NewsController = require("./controllers/NewsC");
const ComposerController = require("./controllers/ComposerC");
const FavoritesController = require("./controllers/FavoritesC");
const PlaylistController = require("./controllers/PlaylistC");
const SongNewComposerController = require("./controllers/SongNewComposersC");
const UserController = require("./controllers/UserC");


router.get("/user/:id", UserController.getUserById);
router.get("/users", UserController.getAllUsers);
router.put("/user/editUser/:id", UserController.editUser);
router.post("/login", UserController.login);
router.post("/register", UserController.register);
router.put("/user/editUserPlaylist/:id", UserController.editUserPlaylist);



router.get("/composers/all", ComposerController.getAllComposers);
router.get("/composer/:id", ComposerController.getComposerById);
router.post("/registerComposer", ComposerController.registerComposer);
router.post("/loginComposer", ComposerController.loginComposer);
router.put("/editNumberSongs/:id", ComposerController.editComposer);
router.put("/editArtistActivate/:id", ComposerController.editComposerActivate);


router.get("/composers/songs/:id", SongNewComposerController.getSongById);
router.get("/composers/songs", SongNewComposerController.getAllSongNewComposer);
router.post("/composer/addSong", SongNewComposerController.createSong);
router.put("/newArtist/editSong/:id", SongNewComposerController.editSong);
router.put("/editSong/activate/:id", SongNewComposerController.editSongActivate);
router.delete("/composer/deletesong/:id", SongNewComposerController.deleteSong);


router.get("/playlist", PlaylistController.getAllPlaylist);
router.get("/myplaylist/:id", PlaylistController.getPlaylistById);
router.post("/playlist/addPlaylist", PlaylistController.createPlaylist);
router.put("/editPlaylist/publicprivate/:id", PlaylistController.editPlaylistPublicPrivate);
router.put("/playlist/editPlaylist/:id", PlaylistController.editPlaylist);
router.delete("/playlist/delete/:id", PlaylistController.deletePlaylist);



router.get("/favorites", FavoritesController.getAllFavorites);
router.post("/favorites/addFavorites", FavoritesController.createFavorites);
router.delete("/favorites/deletefavorites/:id", FavoritesController.deleteFavorites);


router.get("/composers/news", NewsController.getAllNews);
router.post("/composer/addNews", NewsController.createNews);
router.delete("/homepage/deletenews/:id", NewsController.deleteNews);
router.put("/editNews/:id", NewsController.editNewsActivate);










module.exports = router;
