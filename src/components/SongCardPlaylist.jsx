import { Link } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import { useNavigate } from "react-router-dom";

import axios from 'axios';
import PlayPause from './PlayPause';
import { playPause, setActiveSong } from '../redux/features/playerSlice';
import { MdOutlineDeleteOutline } from 'react-icons/md';

const SongCardPlaylist = ({ song, isPlaying, activeSong, i, data, playlista, setUpdateContent }) => {
  const dispatch = useDispatch();
  const handlePauseClick = () => {
    dispatch(playPause(false))
  }

  const handlePlayClick = () => {
    dispatch(setActiveSong({ song, data, i }));
    dispatch(playPause(true));
  }
  const navigate = useNavigate();


  

  function deleteData(value) {
    const edit_playlist = {}
    edit_playlist.name = playlista.name;
    edit_playlist.user = playlista.user;
    edit_playlist.songs = playlista.songs.filter(songs => songs.api_key !== value)
    axios.put(`http://localhost:3002/playlist/editPlaylist/${playlista._id}`, edit_playlist)
      .then(response => {
        console.log(response);
      })
      .catch(error => {
        console.log(error);
      });
      navigate('/myPlaylists');

  }

  return (
    <div className="flex flex-wrap sm:justify-start
    justify-center gap-2">                               
            
        <div className='flex flex-col w-[200px] p-4 bg-white/5 bg-opacity-80 backdrop-blur-sm 
                            animate-slideup rounded-lg cursor-pointer'>
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
          <Link to={song.artists ? `/artists/${song?.
            artists[0]?.adamid}` : '/top-artists'}>
            {song.subtitle}
          </Link>

        </p>
        <p className='text-sm truncate text-gray-300 mt-1'>
        <MdOutlineDeleteOutline onClick={() => deleteData(song.key)} className="btn btn-primary w-6 h-6 mt-2" />
        </p>

      </div>
    </div>
    </div>
  );
};

export default SongCardPlaylist;
