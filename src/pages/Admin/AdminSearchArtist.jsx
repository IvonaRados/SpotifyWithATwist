import { Link } from "react-router-dom";
import React, { useState, useEffect } from "react";
import { FiSearch } from 'react-icons/fi';

import axios from 'axios';
import { useNavigate } from "react-router-dom";
import Discover from "../User/Discover";
import {  Pagination, Sidebar, Loader } from "../../components";
import { useParams } from 'react-router-dom';
import { linksAdmin } from "../../assets/constants";
import { MdToggleOn, MdToggleOff } from "react-icons/md";


//Stranica samog izvodaca gdje vidi svoju stranicu



const AdminSearchArtist = () => {
    const navigate = useNavigate();
    const { searchValue } = useParams();

    const admin_role = localStorage.getItem("role");
    const [artists, setArtists] = useState([]);
    console.log(searchValue);
    const [updateContent, setUpdateContent] = useState(false);
    const [isLoading, setIsLoading] = useState(true); // Add loading state

    const fetchData = () => {
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
        ).then((value) => value.json().then((artist) => { setArtists(artist);     setIsLoading(false);
        }))
        console.log("Artists: ", artists);
    }
    
    useEffect(() => {
        getArtists();
    }, []);



    var artistsInSearch = []

    artists.forEach(artist => {
        const isVisible = artist.name.includes(searchValue);
        if (isVisible) {
            artistsInSearch.push(artist);
        }

    })

    const [currentPage, setCurrentPage] = useState(1);
    const [postPerPage, setPostPerPage] = useState(2);

    const indexOfLastPost = currentPage * postPerPage;
    const indexOfFirstPost = indexOfLastPost - postPerPage;

    const paginate = (pageNumber) => setCurrentPage(pageNumber);

    var currentPosts = artistsInSearch.slice(indexOfFirstPost, indexOfLastPost)


    const handleButtonClick = () => {
        navigate('/adminArtistPage');
    };



    function addData(value) {
        const flag = "active";
        axios.put(`http://localhost:3002/editArtistActivate/${value}`, { flag })
            .then(response => {
                console.log(response);
            })
            .catch(error => {
                console.log(error);
            });

        setUpdateContent(true);
    }

    function removeData(value) {
        const flag = "inactive";


        axios.put(`http://localhost:3002/editArtistActivate/${value}`, { flag })
            .then(response => {
                console.log(response);
            })
            .catch(error => {
                console.log(error);
            });

        setUpdateContent(true);
    }
    if (isLoading  || !artists) {
        return <Loader title="Loading..." />;
      }


    return (
        <div>
            {
                admin_role === "Admin"  ?
                    <div className="relative flex">
                        <Sidebar linkValue={linksAdmin} />
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
                                justify-center gap-8">
                                            <div>
                                                <div className="flex flex-wrap sm:justify-start
                            justify-center gap-8">
                                                    {currentPosts?.map((item) => {
                                                        return item.flag != null ? (

                                                            <div className="flex flex-wrap sm:justify-start
                                    justify-center ml-6">    
                                        
                                        <div className='flex flex-col w-[200px]  p-4 bg-white/5 bg-opacity-80 backdrop-blur-sm 
                                                            animate-slideup rounded-lg cursor-pointer'>
                                            <div className="relative w-full h-full group">
                                                
                                                <img className="w-44 h-44" alt="song_img" src ={item.img} />

                                            </div>
                                            <div className="flex justify-between mt-7">
                                                    <p className="font-semibold text-lg text-white truncate">
                                                    {item.name}
                                                </p>
                                                
                                                <div>
                                                { item.flag==="inactive" ? 
                                                            <p className="font-semibold text-xl text-white truncate">
                                                            <MdToggleOff onClick={() => addData(item._id)} className="btn btn-primary w-9 h-9" />
                                                            </p>

                                                        :
                                                            <p className="font-semibold text-lg text-white truncate">
                                                                <MdToggleOn onClick={() => removeData(item._id)} className="btn btn-primary w-9 h-9 " />
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

                                        </div>

                                    </div>
                                    <div>

                                        <Pagination postPerPage={postPerPage} totalPosts={artistsInSearch.length} paginate={paginate} />

                                    </div>
                                </div>
                            </div>
                        </div>


                    </div>
                    : <Discover />}
        </div>
    )
}

export default AdminSearchArtist;

