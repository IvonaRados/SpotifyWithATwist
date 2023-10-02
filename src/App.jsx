import { useSelector } from 'react-redux';
import { Route, Routes } from 'react-router-dom';

import { MusicPlayer } from './components';
import { Playlist, Discover, Search, SongDetails, 
  Homepage, UserLoginRegister, PublicPlaylist, ComposerLoginRegister, UserRegister, 
  ComposerRegister, Logout, AddNewPlaylist, MyPlaylists, Favorites, AllUsers } from './pages';
import { HomepageComposer, AddNewSongs, AllNewSongs, AddNewNews, NewArtists, Artist, NewArtistsFollow, FirstFavorites} from './pages';

import {Admin, AdminSearchSongs, AdminSearchArtist, AdminSongs, AdminNews, AdminLogin, AdminArtist} from './pages';

const App = () => {
  const { activeSong } = useSelector((state) => state.player);

  return (
    <div>
      <div className="flex-1 flex flex-col bg-gradient-to-br from-black to-[#29043a]">

        <div className="px-6 h-[calc(100vh)] overflow-y-scroll hide-scrollbar flex xl:flex-row flex-col-reverse">
          <div className="flex-1 h-fit pb-40">
          <div id="modal-root"></div>
            <Routes>
              <Route path="/Discover" element={<Discover />} />
              <Route path="/" element={<Homepage />} />
              <Route path="/user-lr" element={<UserLoginRegister />} />
              <Route path="/logout" element={<Logout />} />
              <Route path="/composer-lr" element={<ComposerLoginRegister />} />
              <Route path="/user-register" element={<UserRegister />} />
              <Route path="/composer-register" element={<ComposerRegister />} />
              <Route path="/songs/:songid" element={<SongDetails />} />
              <Route path="/search/:searchTerm" element={<Search />} />
              <Route path="/favorites" element={<Favorites />} />
              <Route path="/addNewPlaylist" element={<AddNewPlaylist />} />
              <Route path="/myPlaylists" element={<MyPlaylists />} />
              <Route path="/allNewSongs" element={<AllNewSongs />} />
              <Route path="/allPlaylists" element={<PublicPlaylist />} />
              <Route path="/addNewPlaylist" element={<AddNewPlaylist />} />
              <Route path="/myPlaylist/:playlist" element={<Playlist />} />
              <Route path="/homepageComposer" element={<HomepageComposer />} />
              <Route path="/addNewSong" element={<AddNewSongs />} />
              <Route path="/addNewNews" element={<AddNewNews />} />
              <Route path="/newArtists" element={<NewArtists />} />
              <Route path="/following" element={<NewArtistsFollow />} />
              <Route path="/artist/:artistid" element={<Artist />} />
              <Route path="/firstFavorites" element={<FirstFavorites />} />
              <Route path="/adminPage" element={<Admin />} />
              <Route path="/adminLogin" element={<AdminLogin />} />
              <Route path="/adminArtistPage" element={<AdminArtist />} />
              <Route path="/adminSongsPage" element={<AdminSongs />} />
              <Route path="/adminNewsPage" element={<AdminNews />} />
              <Route path="/AdminSearchSongs/:searchValue" element={<AdminSearchSongs/>} />
              <Route path="/AdminSearchArtist/:searchValue" element={<AdminSearchArtist/>} />
              <Route path="/allUsers" element={<AllUsers/>} />

            </Routes>
          </div>
        </div>
      </div>

      {activeSong?.title && (
        <div className="absolute h-28 bottom-0 left-0 right-0 flex animate-slideup 
        bg-gradient-to-br from-white/10 to-[#380844] backdrop-blur-lg rounded-t-3xl z-10">
          <MusicPlayer />
        </div>
      )}
    </div>
  );
};

export default App;
