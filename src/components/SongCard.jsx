import { Link } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import axios from 'axios';
import { useState } from "react";
import { useEffect } from 'react';
import { useNavigate } from "react-router-dom";

import PlayPause from './PlayPause';
import { playPause, setActiveSong } from '../redux/features/playerSlice';
import { HiThumbUp, HiThumbDown, HiHeart, HiOutlineHeart } from 'react-icons/hi';
import PopUp from './PopUp';
import { MdPlaylistAdd } from 'react-icons/md';



const SongCard = ({ song, isPlaying, activeSong, i, data, isActive, setIsActive, setSong }) => {

  const [choosePL, setChoosePL] = useState([]);
  const [playlists, setPlaylists] = useState([]);

  const user_id = localStorage.getItem("id");
  const [favorites, setFavorites] = useState([]);
  const [user, setUser] = useState([]);
  const navigate = useNavigate();
  const id = localStorage.getItem("id");
  const [updateContent, setUpdateContent] = useState(false);

    const fetchData = () => {
        getUser();
        getArtists();
        getFavorites();
    }

    useEffect(() => {
        if (updateContent) {
            fetchData(); 
            setUpdateContent(false); 
        }
    }, [updateContent]);

  var playl;

  const dispatch = useDispatch();
  const handlePauseClick = () => {
    dispatch(playPause(false))

  }
  const handlePlayClick = () => {
    dispatch(setActiveSong({ song, data, i }));
    dispatch(playPause(true));
  }

  
  function getPlaylists() {
    const response = fetch(
      'http://localhost:3002/playlist'
    ).then((value) => value.json().then((playlists) => { setPlaylists(playlists) }))
  }

  useEffect(() => {
    getPlaylists();
  }, []);


  function getUser() {
    const response = fetch(
      `http://localhost:3002/user/${id}`
    ).then((value) => value.json().then((user) => { setUser(user) }))
  }

  useEffect(() => {
    getUser();
  }, []);


  function getFavorites() {
    const response = fetch(
      'http://localhost:3002/favorites'
    ).then((value) => value.json().then((favorites) => { setFavorites(favorites) }))
  }

  useEffect(() => {
    getFavorites();
  }, []);

  const postData = (value) => {
    //e.preventDefault();
    const user_email = localStorage.getItem("email");
    const user_id = localStorage.getItem("id");
    const favorites = { name: song.title, song_key: song.key, name_composer: song.subtitle, 
      img: song.images.background, user: user_id };
    axios.post(`http://localhost:3002/favorites/addFavorites`, favorites);

    console.log(user_email, user_id, song.title, song.subtitle, song.images.background);
    navigate("/favorites");
  }

  const deleteData = (value) => {
    //e.preventDefault();
    let fav_id;
    favList.some((obj) => {
      if (obj.user === user._id && obj.song_key === value) {
        fav_id = obj.id
        console.log(fav_id);
      }
    })
    axios.delete(`http://localhost:3002/favorites/deletefavorites/${fav_id}`);
    console.log("Deleted from favorites");
    navigate("/favorites");
  }


  

  const favList = [];
  favorites.forEach(obj => {
    favList.push({ "id": obj._id, "song_key": obj.song_key, "user": obj.user });
  })


  return (
    <div className='flex flex-col w-[200px] p-4bg-white/5 bg-opacity-80 
    backdrop-blur-sm animate-slideup rounded-lg cursor-pointer '>
      <div className="relative w-full h-50 group">
        <div className={`absolute inset-0 justify-center items-center
                               bg-black bg-opacity-50 group-hover:flex 
        ${activeSong?.title === song.title ?
            'flex  bg-black bg-opacity-70' : 'hidden'} 
        `} >
          <PlayPause
            isPlaying={isPlaying}
            activeSong={activeSong}
            song={song}
            handlePause={handlePauseClick}
            handlePlay={handlePlayClick}
          />

        </div>
        <img alt="song_img" src={song.images?.coverart} />

      </div>
      <div className="mt-4 flex flex-col">
        <p className="font-semibold text-lg text-white truncate">
          <Link to={`/songs/${song?.key}`}>
            {song.title}
          </Link>

        </p>
        <p className='text-sm truncate text-gray-300 mt-1'>
          
            {song.subtitle}

        </p>
        <div className="flex justify-between">
          {
            favList.some(obj => obj.user === user._id && obj.song_key === song.key) ?
              <p className="font-semibold text-lg text-white truncate mr-8">
                
                  <HiHeart onClick={() => deleteData(song.key)} className="btn btn-primary w-6 h-6 mr-2" />
              </p>
              :
              <p className="font-semibold text-lg text-white truncate mr-8">
                <HiOutlineHeart onClick={() => postData(song.key)} className=" btn btn-primary w-6 h-6 mr-2" />
              </p>
          }
          <p className="font-semibold text-lg text-white truncate" >
          
          <MdPlaylistAdd onClick={() => {setIsActive(!isActive); setSong(song)}} className=" btn btn-primary w-6 h-6"/>
            </p>
        </div>

        
      </div>
    </div>
  );
};

export default SongCard;
