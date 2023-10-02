import React, { useState, useEffect } from "react";
import { FiSearch } from 'react-icons/fi';
import axios from 'axios';
import { useNavigate } from "react-router-dom";
import Discover from "../User/Discover";
import { Sidebar, Pagination, Loader } from "../../components";
import { linksAdmin } from "../../assets/constants";
import { MdToggleOn, MdToggleOff } from "react-icons/md";


//Stranica samog izvodaca gdje vidi svoju stranicu



const AdminSongs = () => {
    const navigate = useNavigate();
    const [inputValue, setInputValue] = useState('');
    const admin_role = localStorage.getItem("role");
    const [songs, setSongs] = useState([]);
    const [artists, setArtists] = useState([]);
    const [selectedValue, setSelectedValue] = useState(''); // State to store the selected value

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


    const handleInputChange = (event) => {
        setInputValue(event.target.value);
    };

    const handleButtonClick = () => {
        //posalji rijec na search pagination
        navigate(`/AdminSearchSongs/${inputValue}`);

    };


    const [currentPage, setCurrentPage] = useState(1);
    const [postPerPage, setPostPerPage] = useState(8);   
    const indexOfLastPost = currentPage * postPerPage;
    const indexOfFirstPost = indexOfLastPost - postPerPage;
    var currentPosts = songs.slice(indexOfFirstPost, indexOfLastPost)

    const paginate = (pageNumber) => setCurrentPage(pageNumber);

    const handleDropdownChange = (event) => {
        setSelectedValue(event.target.value);
        if(event.target.value==="sortUp"){
            console.log("Up")
            const sortedSongs = songs.sort((a, b) => a.name < b.name ? 1 : -1);
            currentPosts=sortedSongs.slice(indexOfFirstPost, indexOfLastPost);
            
        }
        else if(event.target.value==="sortDown"){
            console.log("Down")
            const sortedSongs = songs.sort((b, a) => b.name > a.name ? 1 : -1);
            currentPosts=sortedSongs.slice(indexOfFirstPost, indexOfLastPost);
        }
        else if(event.target.value==="latestdDate"){
            console.log("date")
            const sortedSongs = songs.sort((a, b) => new Date(a.date) - new Date(b.date));
            currentPosts=sortedSongs.slice(indexOfFirstPost, indexOfLastPost);
        }
        else if(event.target.value==="newestDate"){
            console.log("date")
            const sortedSongs = songs.sort((b, a) => new Date(a.date) - new Date(b.date));
            currentPosts=sortedSongs.slice(indexOfFirstPost, indexOfLastPost);
        }
        

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

    if (isLoading || !songs || !artists) {
        return <Loader title="Loading..." />;
        }

    return (
        <div>
            {
                admin_role === "Admin" ?
                    <div className="relative flex">
                        <Sidebar linkValue={linksAdmin}/>
                        <div className="flex-1 flex flex-col bg-gradient-to-br from-black to-[#380646]">

                            <div className="flex flex-row justify-start items-center">
                                <FiSearch className="w-5 h-5 ml-4" />
                                <input value={inputValue} onChange={handleInputChange} id="search-field" placeholder="Search" t
                                ype="text" className="flex-1 bg-transparent  border-none outline-none placeholder-gray-500
                            text-base text-white p-4"
                                />

                            </div>
                            <button class="py-2.5 px-4 w-24 h-9 mt-2 ml-6 inline-flex justify-center items-center rounded-md border 
                            border-transparent font-semibold bg-purple-400 text-white hover:bg-purple-600 focus:outline-none 
                            focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 transition-all text-sm" 
                            onClick={handleButtonClick}>Search</button>

                            <br></br>

                            <div className="flex flex-col">
                                <div>
                                    <div>
                                        
                                        <select  className="bg-purple-400 text-white hover:bg-purple-600 ml-6 p-3 text-sm rounded-lg outline-none sm:mt-0 mt-5" value={selectedValue} onChange={handleDropdownChange}>
                                            <option value="">Select an option</option>
                                            <option value="sortUp">Sort by song name (down)</option>
                                            <option value="sortDown">Sort by song name (up)</option>
                                            <option value="latestdDate">Sort by latest date </option>
                                            <option value="newestDate">Sort by newest date</option>
                                        </select>
                                    </div>
                                    <br></br><br></br>
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
                                                                            <p className='text-sm truncate text-gray-300  mt-1'>
                                                                                Likes: {item.likes}
                                                                                
                                                                            </p>
                                                                        </div>
                                                                        <p className='text-sm truncate text-gray-300 text-center mt-1'>
                                                                                {item.flag === "inactive" ?
                                                                                <p className="font-semibold text-xl text-white text-center truncate">
                                                                                    <MdToggleOff onClick={()=> addData(item)} className="btn btn-primary w-9 h-9"/>
                                                                                </p>

                                                                                :
                                                                                <p className="font-semibold text-lg text-white text-center truncate ">
                                                                                    <MdToggleOn onClick={()=> removeData(item)} className="btn btn-primary w-9 h-9"/>
                                                                                </p>


                                                                            }
                                                                            </p>
                                                                                       
                                                                        
                                                                        

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
                                        
                                        <Pagination postPerPage={postPerPage} totalPosts={songs.length} paginate={paginate} />
                                                                                
                                    </div>
                                </div>
                            </div>
                        </div>


                    </div>
                    : <Discover />}
        </div>
    )
}

export default AdminSongs;

