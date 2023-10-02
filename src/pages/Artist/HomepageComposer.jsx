import { Link } from "react-router-dom";
import React, { useState, useEffect } from "react";

import axios from 'axios';
import { useNavigate } from "react-router-dom";
import { Discover } from "..";
import { Sidebar } from "../../components";
import { linksArtist } from "../../assets/constants";
import { MdOutlineDeleteOutline } from "react-icons/md";
import { MdOutlineSubtitlesOff } from "react-icons/md";
import { FiMicOff } from "react-icons/fi";
//Stranica samog izvodaca gdje vidi svoju stranicu



const HomepageComposer = () => {
    const navigate = useNavigate();
    const [name, setName] = useState("");
    const composer_id = localStorage.getItem("id");
    const composer_name = localStorage.getItem("name");
    const composer_role = localStorage.getItem("role");
    const img = localStorage.getItem("img");

    const [songs, setSongs] = useState([]);
    const [news, setNews] = useState([]);
    const [artist, setArtist] = useState([]);
    const [favorites, setFavorites] = useState([]);

    const [updateContent, setUpdateContent] = useState(false);

    const fetchData = () => {
        getSongs();
        getNews();
        getArtist();
        getFavorites();
    }

    useEffect(() => {
        if (updateContent) {
            fetchData(); 
            setUpdateContent(false); 
        }
    }, [updateContent]);

    function getArtist() {
        const response = fetch(
            `http://localhost:3002/composer/${composer_id}`
        ).then((value) => value.json().then((artist) => { setArtist(artist) }))
    }

    useEffect(() => {
        getArtist();
    }, []);


    function getNews() {
        const response = fetch(
            'http://localhost:3002/composers/news'
        ).then((value) => value.json().then((news) => { setNews(news) }))
    }

    function getFavorites() {

        const response = fetch(
            'http://localhost:3002/favorites'
        ).then((value) => value.json().then((favorites) => { setFavorites(favorites) }))
    }

    useEffect(() => {
        getFavorites();
    }, []);

    useEffect(() => {
        getNews();
    }, []);

    useEffect(() => {
        getSongs();
    }, []);


    function getSongs() {
        const response = fetch(
            'http://localhost:3002/composers/songs'
        ).then((value) => value.json().then((songs) => { setSongs(songs) }))
    }

    function deleteData(value) {

        const song = songs.find(item => item._id === value);
        const fav_id = favorites.find(item => item.song_key ===value);
        console.log(fav_id)
        const totalSongs = artist.totalSongs - 1;
        const totalLikes = artist.totalLikes - song.likes;

        axios.put(`http://localhost:3002/editNumberSongs/${composer_id}`, { totalSongs, totalLikes })
            .then(response => {
                console.log(response);
            })
            .catch(error => {
                console.log(error);
            });

        axios.delete(`http://localhost:3002/composer/deletesong/${value}`);

        axios.delete(`http://localhost:3002/favorites/deletefavorites/${fav_id._id}`);


        setUpdateContent(true);
    }

    function deleteNews(value) {
        axios.delete(`http://localhost:3002/homepage/deletenews/${value}`);
        setUpdateContent(true);
    }

    return (
        <div>
            {
                composer_role === "Composer" && songs != null ?
                    <div className="relative flex">
                        <Sidebar linkValue={linksArtist} username={composer_name} img={img}/>
                        <div className="flex justify-between">

                        <div className="flex flex-col">
                            <div className="w-full flex justify-between items-center sm:flex-row flex-col mt-4 mb-10">
                                <h1 className="font-bold text-3x1 text-white text-left">
                                </h1>
                            </div>


                            <div>
                                <div className="flex flex-wrap sm:justify-start
                            justify-center">

                                    {songs.map((item) => {

                                        return composer_id === item.composer ? (
                                            <div className="flex flex-wrap sm:justify-start
                                    justify-center  ml-16 mt-8">

                                                <div className='flex flex-col w-[250px] p-4 bg-white/5 bg-opacity-80 backdrop-blur-sm 
                                                            animate-slideup rounded-lg cursor-pointer'>
                                                    <div className="relative w-full h-full group">

                                                        <img className="w-60 h-60" alt="song_img" src={item.img} />

                                                    </div>
                                                    <div className="mt-4 flex flex-col">
                                                        <p className="font-semibold text-lg text-white text-center truncate">
                                                            {item.name}


                                                        </p>
                                                        <p className='text-sm truncate text-gray-300 text-center mt-1'>
                                                            {composer_name}

                                                        </p>


                                                        <div className="flex justify-between">
                                                            <p className='text-sm truncate text-gray-300 mt-1'>
                                                                Likes: {item.likes}
                                                            </p>
                                                            <p className='text-sm truncate text-gray-300 mt-1'>
                                                                {item.date}
                                                            </p>
                                                        </div>



                                                        <div className="flex justify-between">
                                                            <p className="font-semibold text-lg text-white truncate">
                                                                <MdOutlineDeleteOutline onClick={() => deleteData(item._id)} className="btn btn-primary w-6 h-6 mt-2" />
                                                            </p>
                                                            <p className="font-semibold text-lg text-white truncate">
                                                                {item.flag === "inactive" ?
                                                                    <FiMicOff className="btn btn-primary  text-gray-300 mt-2  w-6 h-6" />


                                                                    :
                                                                    <FiMicOff className="btn btn-primary  text-transparent mt-2 ml-48 w-6 h-6 " />


                                                                }</p>
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
                        <div className="xl:sticky  w-[500px]  mt-20 ml-4 ">
                            <div>
                                {news.map((item) => {
                                    return composer_id === item.composer ? (

                                        <div className=" mt-5 ">

                                            <div className='flex flex-col p-4 bg-white/5 bg-opacity-80 backdrop-blur-sm 
                                                        animate-slideup rounded-lg cursor-pointer '>

                                                <div className="flex flex-col">
                                                    <p className="font-semibold text-lg text-white">
                                                        {item.title_of_article}


                                                    </p>
                                                    <p className='text-sm text-gray-300 mt-1'>
                                                        <h2>{item.text} </h2>

                                                    </p>
                                                    <div className="flex justify-between">
                                                        <p className="font-semibold text-lg text-white truncate">
                                                            <MdOutlineDeleteOutline onClick={() => deleteNews(item._id)} className="btn btn-primary w-6 h-6 mt-2" />
                                                        </p>
                                                        <p className="font-semibold text-lg text-white truncate">
                                                            {item.flag === "inactive" ?
                                                                <MdOutlineSubtitlesOff className="btn btn-primary  text-gray-300 mt-2  w-6 h-6" />


                                                                :
                                                                <p></p>

                                                            }</p>
                                                    </div>


                                                </div>

                                            </div>
                                            <br></br>
                                        </div>

                                    ) : (
                                        <div></div>
                                    );

                                })}

                            </div>


                        </div>
                        </div>


                    </div>
                    : <Discover />}
        </div>
    )
}

export default HomepageComposer;

