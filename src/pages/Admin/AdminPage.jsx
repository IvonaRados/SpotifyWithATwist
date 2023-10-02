import React, { useState, useEffect } from "react";
import axios from 'axios';
import { useNavigate } from "react-router-dom";
import Discover from "../User/Discover";
import { Sidebar, Loader} from "../../components";
import { linksAdmin } from "../../assets/constants";
import { MdToggleOn, MdToggleOff } from "react-icons/md";


//Stranica samog izvodaca gdje vidi svoju stranicu

const Admin = () => {
    const navigate = useNavigate();
    const admin_name = localStorage.getItem("name");
    const admin_role = localStorage.getItem("role");

    const [songs, setSongs] = useState([]);
    const [artists, setArtists] = useState([]);
    const [isLoading, setIsLoading] = useState(true); // Add loading state
    

    const sortedSongsByDate = songs.sort((b, a) => new Date(a.date) - new Date(b.date));

    const [updateContent, setUpdateContent] = useState(false);

    const fetchData = () => {
        getSongs();
        getArtists();
    }

    useEffect(() => {
        if (updateContent) {
            fetchData(); 
            setUpdateContent(false); 
        }
    }, [updateContent]);


    function getArtists() {
        const response = fetch(
            'http://localhost:3002/composers/all'
        ).then((value) => value.json().then((artists) => { setArtists(artists);     setIsLoading(false);
        }))
        console.log("Artists: ", artists);
    }
    
    useEffect(() => {
        getArtists();
    }, []);



    function getSongs() {
        const response = fetch(
            'http://localhost:3002/composers/songs'
        ).then((value) => value.json().then((songs) => { setSongs(songs);     setIsLoading(false);
        }))
        console.log(songs);
    }
    
    
    useEffect(() => {
        getSongs();
    }, []);


    const addData= async(object)=>{ 


        const flag = "active";

        console.log(object);

        axios.put(`http://localhost:3002/editSong/activate/${object._id}`, { flag })
            .then(response => {
                console.log(response);
            })
            .catch(error => {
                console.log(error);
            });


        const artist = artists.find(item => item._id === object.composer);
        const totalSongs = artist.totalSongs +1;
        const totalLikes = artist.totalLikes+object.likes;
    
        axios.put(`http://localhost:3002/editNumberSongs/${object.composer}`, {totalSongs, totalLikes})
                .then(response => {
                    console.log(response);
                })
                .catch(error => {
                    console.log(error);
                });
        
        setUpdateContent(true); 
    }

    if (isLoading || !songs || !artists) {
        return <Loader title="Loading..." />;
      }
   
    return (
        <div>
            {
                admin_role==="Admin" ?
                <div className="relative flex">
                    <Sidebar linkValue={linksAdmin}/>  
                    
                    <div className="flex flex-col">
                        <div className="w-full flex justify-between items-center sm:flex-row flex-col mt-4 mb-10">
                            <h1 className="font-bold text-3x1 text-white text-left">
                                Welcome Admin 
                            </h1>
                        </div>
                    <div>
                        <h4 className="font-bold text-3x1 text-white text-left">
                            Songs that need to be approved: </h4>
                    </div>
                    

                    <div>
                        <div className="flex flex-wrap sm:justify-start
                            justify-center">
                            
                            {sortedSongsByDate.map((item) => {
                                
                                return item.flag==="inactive" ? ( 
                                    <div className="flex flex-wrap sm:justify-start
                                    justify-center ml-6 mt-5">

                                                <div className='flex flex-col w-[250px] p-4 bg-white/5 bg-opacity-80 backdrop-blur-sm 
                                                            animate-slideup rounded-lg cursor-pointer'>
                                                    <div className="relative w-full h-full group">

                                                                    

                                                                        <img className="w-60 h-60" alt="song_img" src={item.img} />

                                                                    </div>
                                                                    <div className="mt-4 flex flex-col">
                                                                        <p className="font-semibold text-lg text-white text-center truncate">
                                                                            {item.name}
                                                                        </p>
                                                                        <div>
                                                                        <p className='text-sm truncate text-gray-300 text-center mt-1'>
                                                                                {item.nameofcomposer}
                                                                            </p>
                                                                                       
                                                                        </div>
                                                                        <div className="flex justify-between">
                                                                            <p className='text-sm truncate text-gray-300 mt-1'>
                                                                                {item.date}
                                                                            </p>
                                                                                <p className="font-semibold text-xl text-white truncate">
                                                                                    <MdToggleOff onClick={()=> addData(item)} className="btn btn-primary w-9 h-9"/>
                                                                                </p>

                                                                                
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
                </div>

            
        </div>
        : <Discover/>}
        </div>
    )
}

export default Admin;

