import { useState } from "react";
import { NavLink } from "react-router-dom";
import { RiCloseLine } from 'react-icons/ri';
import { HiOutlineMenu } from "react-icons/hi";
import { logo } from '../assets';
import { linksUser } from "../assets/constants";

import { useEffect } from 'react';
import { useNavigate } from "react-router-dom";
import axios from 'axios';


const PopUp = ({ linkValue, setIsActive }) => {


  const [choosePL, setChoosePL] = useState([]);
  const [playlists, setPlaylists] = useState([]);
  const user_id = localStorage.getItem("id");
  const [updateContent, setUpdateContent] = useState(false);

    const fetchData = () => {
        getPlaylists();
    }

    useEffect(() => {
        if (updateContent) {
            fetchData(); // Call the fetchData function when updateContent changes
            setUpdateContent(false); // Reset the updateContent flag
        }
    }, [updateContent]);

  var playl;
  console.log(linkValue);

  function getPlaylists() {
    const response = fetch(
      'http://localhost:3002/playlist'
    ).then((value) => value.json().then((playlists) => { setPlaylists(playlists) }))
  }

  useEffect(() => {
    getPlaylists();
  }, []);




  const postDataPlaylist = (value)=> {
    fetch(`http://localhost:3002/myplaylist/${value}`).then(function (res) {
      return res.json();
    }).then(function (json) {
      playl = json;
      saveSongInPlaylist();
    });
  }


  function saveSongInPlaylist() {
    const edit_playlist = {}
    edit_playlist.name = playl.name;
    edit_playlist.user = playl.user;
    const api_kye = {}
    api_kye.api_key = linkValue.key;
    playl.songs.push(api_kye);
    edit_playlist.songs = playl.songs;

    axios.put(`http://localhost:3002/playlist/editPlaylist/${playl._id}`, edit_playlist)
      .then(response => {
        console.log(response);
      })
      .catch(error => {
        console.log(error);
      });
      setUpdateContent(true);
      setIsActive(false);

      }


  return (
    <div className="fixed flex-wrap inset-0 z-50 flex items-center justify-center overflow-x-hidden overflow-y-auto outline-none focus:outline-none">
      <div className="relative w-auto h-80  my-6 ">
        {/*content*/}
        <div className="border-0 rounded-lg shadow-lg relative flex flex-col w-full bg-white outline-none focus:outline-none">
          {/*header*/}
          <div className="flex items-start justify-between p-5 border-b border-solid border-slate-200 rounded-t">
            <h3 className="text-3xl font-semibold">
              Add the song {linkValue.title} to your playlist
            </h3>
            <button
              className="p-1 ml-auto bg-transparent border-0 text-black opacity-5 float-right text-3xl leading-none font-semibold outline-none focus:outline-none"
              onClick={() => setShowModal(false)}
            >
              <span className="bg-transparent text-black opacity-5 h-6 w-6 text-2xl block outline-none focus:outline-none">
                ×
              </span>
            </button>
          </div>
          {/*body*/}
          <div className="relative p-6 flex-auto">

              {playlists.map((item) => {
                return user_id === item.user ? (
                  
                  item.songs.find(api_key => api_key.api_key === linkValue.key) ? (

                    <div className="flex justify-between mt-2">
                      <button type="button1" class="py-2.5 px-4 inline-flex justify-center items-center gap-2 rounded-md border border-transparent font-semibold bg-purple-400 text-white hover:bg-purple-600 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 transition-all text-sm">
                          {item.name}
                      </button>
                      <p>Already added</p>
                    </div>
                  ) : (
                    <div className="flex justify-between mt-2">
                      <button type="button1" class="py-2.5 px-4 inline-flex justify-center items-center gap-2 rounded-md border border-transparent font-semibold bg-purple-400 text-white hover:bg-purple-600 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 transition-all text-sm">
                          {item.name}
                      </button>
                      <button onClick={() => postDataPlaylist(item._id)}  type="button1" class="py-2.5 px-4 inline-flex justify-center items-center gap-2 rounded-md border border-transparent font-semibold bg-purple-400 text-white hover:bg-purple-600 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 transition-all text-sm">
                          Add to playlist
                      </button>
                    </div>
                  )
                ) : (
                  <div>
                  </div>
                )
              })}
            
            
          </div>
  
        <div className="flex items-center justify-end p-6 border-t border-solid border-slate-200 rounded-b">
          <button
            className="text-red-500 background-transparent font-bold uppercase px-6 py-2 text-sm outline-none focus:outline-none mr-1 mb-1 ease-linear transition-all duration-150"
            type="button"
            onClick={() => setIsActive(false)}
          >
            Close
          </button>
        </div>
        </div>

      </div>
    </div>
      
    )
};

export default PopUp;
