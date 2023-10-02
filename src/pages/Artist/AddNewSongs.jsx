import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import axios from 'axios';
import { useNavigate } from "react-router-dom";
import { Sidebar } from "../../components";
import { linksAdmin, linksArtist } from "../../assets/constants";



const AddNewSongs = () => {
    const navigate = useNavigate();
    const [name, setName] = useState("");
    const [imgSong, setImgSong] = useState("");
    const [flag, setFlag] = useState("");

    const current_user_id = localStorage.getItem("id");
    const composer_name = localStorage.getItem("name")
    const img = localStorage.getItem("img");


    const [artist, setArtist] = useState([]);

    //composerid
    //const [id, setId] = useState("");

    function getArtist() {
        
        const response = fetch(
            `http://localhost:3002/composer/${current_user_id}`
        ).then((value) => value.json().then((artist) => { setArtist(artist) }))
        //console.log("artist", artist);
    }

    useEffect(() => {
        getArtist();
    }, []);
    
    

    function postData(e){
        e.preventDefault();
        var newDate = new Date();
        const year = newDate.getFullYear(); // Full year (e.g., 2023)
        const month = newDate.getMonth();   // Month index (0-11)
        const day = newDate.getDate();      // Day of the month (1-31)
        const month1= month+1;

        const date=year+"-"+ month1 +"-"+ day;

        const song = { name: name,
            img: imgSong,
            likes: 0,
            flag:"inactive",
            date:date,
            nameofcomposer:composer_name,
            composer: current_user_id
        };


        axios.post(`http://localhost:3002/composer/addSong`, song);

        

        navigate("/homepageComposer");



    }
    



    return (
        <div className="relative flex">
            <Sidebar linkValue={linksArtist} username={composer_name} img={img}/>
            <div className="flex flex-col items-center justify-center min-h-screen">
                <div className="w-full p-6 m-auto bg-transparent  lg:max-w-xl mt-10 ml-56">
                    <h1 className="text-2xl font-semibold text-center text-white ">
                        Your new song
                    </h1>
                    <form className="mt-6">
                        <div className="mb-2">
                            <input type="name" className="block w-full px-4 py-2 mt-2 text-black bg-white border rounded-md focus:border-purple-400 focus:ring-purple-300 focus:outline-none focus:ring focus:ring-opacity-40"
                                id="name" aria-describedby="nameHelp" placeholder="Enter title of song" onChange={(e) => setName(e.target.value)} 
                            />
                        </div>
                        <div className="mb-2">
                            <input type="imgSong" className="block w-full px-4 py-2 mt-2 text-black bg-white border rounded-md focus:border-purple-400 focus:ring-purple-300 focus:outline-none focus:ring focus:ring-opacity-40"
                                id="imgSong" aria-describedby="imgSongHelp" placeholder="link of image"
                                onChange={(e) => setImgSong(e.target.value)} 
                            />
                        </div>

                        <div className="mt-6">
                            <button onClick={postData} className="w-full px-4 py-2 tracking-wide text-black transition-colors duration-200 transform bg-gray-500 rounded-md hover:bg-gray-600 focus:outline-none">
                                Add
                            </button>
                        </div>
                    </form>

                
                </div>
        </div>
        </div>
    )
}

export default AddNewSongs;

