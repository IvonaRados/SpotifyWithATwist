import { Link } from "react-router-dom";
import React, { useState, useEffect } from "react";
import { FiSearch } from 'react-icons/fi';

import axios from 'axios';
import { useNavigate } from "react-router-dom";
import Discover from "../User/Discover";
import { Pagination, Sidebar, Loader } from "../../components";
import { useParams } from 'react-router-dom';
import { linksAdmin } from "../../assets/constants";
import { MdToggleOn, MdToggleOff } from "react-icons/md";





const AdminSearchSongs = (prop) => {
    const navigate = useNavigate();
    const [name, setName] = useState("");
    //const [id, setId] = useState("");
    const { searchValue } = useParams();

    const admin_id = localStorage.getItem("id");
    const admin_name = localStorage.getItem("name");
    const admin_role = localStorage.getItem("role");
    
    const [songs, setSongs] = useState([]);
    const [artists, setArtists] = useState([]);
    console.log(searchValue);
    const [updateContent, setUpdateContent] = useState(false);
    const [isLoading, setIsLoading] = useState(true); // Add loading state

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

    
    var songsInSearch = []
    songs.forEach(song => {
        const isVisible = song.name.includes(searchValue);
        console.log(song.name, isVisible);
        if (isVisible) {
            songsInSearch.push(song);
        }
    })

    artists.forEach(artist => {
        songs.forEach(song => {
            if (artist._id === song.composer) {
                console.log(artist._id, song.composer, artist.name, searchValue)
                const isVisible = artist.name.includes(searchValue);
                if (isVisible) {
                    songsInSearch.push(song);
                }

            }
        })

    })

    const [currentPage, setCurrentPage] = useState(1);
    const [postPerPage, setPostPerPage] = useState(2);
    
    const indexOfLastPost = currentPage * postPerPage;
    const indexOfFirstPost = indexOfLastPost - postPerPage;

    const paginate = (pageNumber) => setCurrentPage(pageNumber);

    const [selectedValue, setSelectedValue] = useState(''); // State to store the selected value
    var currentPosts = songsInSearch.slice(indexOfFirstPost, indexOfLastPost)


    const handleButtonClick = () => {
        navigate('/adminSongsPage');
    };

    function getArtists() {

        const response = fetch(
            'http://localhost:3002/composers/all'
        ).then((value) => value.json().then((artist) => { setArtists(artist);     setIsLoading(false);
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


    const removeData= async(object)=>{ 
        const flag = "inactive";
        axios.put(`http://localhost:3002/editSong/activate/${object._id}`, { flag })
            .then(response => {
                console.log(response);
            })
            .catch(error => {
                console.log(error);
            });

        const artist = artists.find(item => item._id === object.composer);
        const totalSongs = artist.totalSongs -1;
        const totalLikes = artist.totalLikes-object.likes;
    
        axios.put(`http://localhost:3002/editNumberSongs/${object.composer}`, {totalSongs, totalLikes})
                .then(response => {
                    console.log(response);
                })
                .catch(error => {
                    console.log(error);
                });
        setUpdateContent(true);
    }

    if (isLoading || !songs || !artists ) {
        return <Loader title="Loading..." />;
      }



    return (
        <div>
            {
                admin_role === "Admin" ?
                    <div className="relative flex">
                        <Sidebar linkValue={linksAdmin}/>
                        <div className="flex-1 flex flex-col bg-gradient-to-br from-black to-[#380646]">

                            <div className="flex flex-col">
                                <div className="w-full flex justify-between items-center sm:flex-row flex-col mt-4 mb-10">
                                    <h1 className="font-bold text-3x1 text-white text-left">
                                        Search results for "{searchValue}"
                                    </h1>
                                </div>
                                <button class="py-2.5 px-4 w-24 h-9 mt-2 ml-6 inline-flex justify-center items-center rounded-md border
                                 border-transparent font-semibold bg-purple-400 text-white hover:bg-purple-600 focus:outline-none 
                                 focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 transition-all text-sm"
                                onClick={handleButtonClick}>Go Back</button>
                                <div>
                                    

                                    <div>
                                        
                                                <div id="adminserach" className="flex flex-wrap sm:justify-start
                                justify-center ">
                                                    {currentPosts?.map((item) => {
                                                        return item.flag != null ? (

                                                            <div className="flex flex-wrap sm:justify-start
                                                            justify-center gap-8 ml-6 mt-5">
                        
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
                                                                                                    {item.flag === "inactive" ?
                                                                                                        <p className="font-semibold text-xl text-white truncate">
                                                                                                            <MdToggleOff onClick={()=> addData(item)} className="btn btn-primary w-9 h-9"/>
                                                                                                        </p>
                        
                                                                                                        :
                                                                                                        <p className="font-semibold text-lg text-white truncate ">
                                                                                                            <MdToggleOn onClick={()=> removeData(item)} className="btn btn-primary w-9 h-9"/>
                                                                                                        </p>
                        
                        
                                                                                                    }
                                                                                                </div>
                                                                                                
                                                                                                
                        
                                                                                            </div>
                        
                                                                                        </div>
                                                                                    </div>
                                                        ) : (
                                                            <p></p>
                                                        )

                                                    })}
                                                </div>
                                            
                                    </div>
                                    <div>
                                        
                                        <Pagination postPerPage={postPerPage} totalPosts={songsInSearch.length} paginate={paginate} />
                                                                                
                                    </div>
                                </div>
                            </div>
                        </div>


                    </div>
                    : <Discover />}
        </div>
    )
}

export default AdminSearchSongs;

