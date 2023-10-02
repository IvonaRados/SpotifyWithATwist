import { Error, Loader, SongCard, Sidebar } from "../../components";
import { Navigate, useLocation } from 'react-router-dom';
import { useNavigate } from "react-router-dom";

import React, { useState, useEffect } from "react";
import { Discover } from "..";
import axios from 'axios';
import { linksUser, linksArtist } from "../../assets/constants";
//User vidi stranicu jednog izvođaca i njegove pjsem
import { HiThumbUp, HiThumbDown, HiHeart, HiOutlineHeart } from 'react-icons/hi';

import { MdOutlineDeleteOutline } from "react-icons/md";
import { MdOutlineSubtitlesOff } from "react-icons/md";
import { FiMicOff } from "react-icons/fi";


const Artist = (props) => {
    const location = useLocation();
    const navigate = useNavigate();

    const artistid = location.state;
    const id = localStorage.getItem("id");
    const role = localStorage.getItem("role");
    const current_user = localStorage.getItem("username");
    const img = localStorage.getItem("img");


    const [artist, setArtist] = useState([]);
    const [songs, setSongs] = useState([]);
    const [news, setNews] = useState([]);
    const [user, setUser] = useState([]);
    const [favorites, setFavorites] = useState([]);
    const [updateContent, setUpdateContent] = useState(false);

    const fetchData = () => {
        getSongs();
        getNews();
        getArtist();
        getFavorites();
        getUser();
    }

    useEffect(() => {
        if (updateContent) {
            fetchData(); 
            setUpdateContent(false); 
        }
    }, [updateContent]);

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

    function getSongs() {
        const response = fetch(
            'http://localhost:3002/composers/songs'
        ).then((value) => value.json().then((songs) => { setSongs(songs) }))
    }

    useEffect(() => {
        getSongs();
    }, []);

    function getNews() {
        const response = fetch(
            'http://localhost:3002/composers/news'
        ).then((value) => value.json().then((news) => { setNews(news) }))
    }

    useEffect(() => {
        getNews();
    }, []);


    function getArtist() {
        const response = fetch(
            `http://localhost:3002/composer/${artistid}`
        ).then((value) => value.json().then((artist) => { setArtist(artist) }))
    }

    useEffect(() => {
        getArtist();
    }, []);

    const postDataFavorites = (object) => {

        const user_id = localStorage.getItem("id");
        console.log(object.likes);

        const favorites = { name: object.name, song_key: object._id, img: object.img, name_composer: artist.name, user: user_id, composer: artist._id };
        const likes = { likes: object.likes+1};
        console.log(likes);
        //console.log(favorites)

        axios.post(`http://localhost:3002/favorites/addFavorites`, favorites);


        axios.put(`http://localhost:3002/newArtist/editSong/${object._id}`, likes)
            .then(response => {
                console.log(response);
            })
            .catch(error => {
                console.log(error);
            });

        const totalSongs = artist.totalSongs;
        const totalLikes = artist.totalLikes+1;

        axios.put(`http://localhost:3002/editNumberSongs/${artistid}`, { totalSongs, totalLikes })
            .then(response => {
                console.log(response);
            })
            .catch(error => {
                console.log(error);
            });
        console.log("Added in favorites");
        setUpdateContent(true);
    }


    const deleteDataFavorites = (object) => {
        let fav_id;
        favList.some((obj) => {
            if (obj.user === user._id && obj.song_key === object._id) {
                fav_id = obj.id
            }
        })

        axios.delete(`http://localhost:3002/favorites/deletefavorites/${fav_id}`);

        const likes = { likes: object.likes-1};
        axios.put(`http://localhost:3002/newArtist/editSong/${object._id}`, likes)
            .then(response => {
                console.log(response);
            })
            .catch(error => {
                console.log(error);
            });

        const totalSongs = artist.totalSongs;
        const totalLikes = artist.totalLikes-1;

        axios.put(`http://localhost:3002/editNumberSongs/${artistid}`, { totalSongs, totalLikes })
            .then(response => {
                console.log(response);
            })
            .catch(error => {
                console.log(error);
            });


        console.log("Deleted from favorites");
        setUpdateContent(true);


    }

   

    const favList = [];

    favorites.forEach(obj => {
        favList.push({ "id": obj._id, "song_key": obj.song_key, "user": obj.user });
    })

    return (
        <div>
            {
                role === "User" ?
                    <div className="relative flex">
                        <Sidebar linkValue={linksUser} username={current_user} img={img}/>
                        <div className="flex flex-col">
                            <div className="w-full flex justify-between items-center sm:flex-row flex-col mt-4 mb-10">
                                <h2 className="font-bold text-3x1 text-white text-left">
                                    Welcome to the page from {artist.name}
                                </h2>
                            </div>


                            <div>
                                <div className="flex flex-wrap sm:justify-start
                            justify-center">

                                    {songs.map((item) => {

                                        return artist._id === item.composer && item.flag === "active" ? (
                                            <div className="flex flex-wrap sm:justify-start 
                                    justify-center gap-8 mt-5 ml-6">

                                                <div className='flex flex-col w-[220px] p-4 bg-white/5 bg-opacity-80 backdrop-blur-sm 
                                                            animate-slideup rounded-lg cursor-pointer'>
                                                    <div className="relative w-full h-full group">

                                                        <img className="w-60 h-48" alt="song_img" src={item.img} />

                                                    </div>
                                                    <div className="mt-4 flex flex-col">
                                                        <p className="font-semibold text-lg text-white text-center truncate">
                                                            {item.name}


                                                        </p>
                                                        <p className='text-sm truncate text-gray-300 text-center mt-1'>
                                                            {artist.name}

                                                        </p>
                                                    </div>
                                                    <div className="flex justify-between">
                                                        <p className='text-sm truncate text-gray-300 mt-1'>
                                                            {item.date}

                                                        </p>



                                                        <div >
                                                            {
                                                                favList.some(obj => obj.user === user._id && obj.song_key === item._id) ?


                                                                    <p className="font-semibold text-lg text-white truncate">

                                                                        <HiHeart onClick={() => deleteDataFavorites(item)} className="btn btn-primary w-6 h-6 mr-2" />
                                                                    </p>
                                                                    :
                                                                    <p className="font-semibold text-lg text-white truncate">
                                                                        <HiOutlineHeart onClick={() => postDataFavorites(item)} className=" btn btn-primary w-6 h-6 mr-2" />
                                                                    </p>


                                                            }
                                                        </div>
                                                    </div>

                                                </div>

                                            </div>
                                        ) : (
                                            <div></div>
                                        );

                                    })}
                                </div>
                            </div>
                            <br></br><br></br><br></br><br></br>
                        </div>
                        <div className="md:flex  flex-col w-[440px] ml-auto mr-8 mt-16 rounded-lg
      py-10 px-4 bg-white/5 bg-opacity-80">
                                    {news.map((item) => {
                                        return artist._id === item.composer && item.flag === "active" ? (

                                            <div className="flex flex-wrap sm:justify-start
                                        justify-center gap-8 mt-5">

                                                <div className='flex flex-col p-4 bg-white/5 bg-opacity-80 backdrop-blur-sm 
                                                        animate-slideup rounded-lg cursor-pointer'>

                                                    <div className="flex flex-col">
                                                        <p className="font-semibold text-lg text-white truncate">
                                                            {item.title_of_article}


                                                        </p>
                                                        <p className='text-sm truncate text-gray-300 mt-1'>
                                                            {item.text}

                                                        </p>

                                                    </div>

                                                </div>
                                            </div>
                                        ) : (
                                            <div></div>
                                        );

                                    })}

                                </div>
                    </div>
                    
                    : <Discover />}
        </div>
    )

}

export default Artist;

