import { FiSearch } from 'react-icons/fi';
import React, { useState, useEffect } from "react";
import axios from 'axios';
import { useNavigate } from "react-router-dom";
import Discover from "../User/Discover";
import { Pagination, Sidebar, Loader } from "../../components";
import { linksAdmin } from '../../assets/constants';
import { MdToggleOn, MdToggleOff } from "react-icons/md";
import Admin from './AdminPage';


//Stranica samog izvodaca gdje vidi svoju stranicu



const AdminArtist = () => {
    const navigate = useNavigate();
    const admin_role = localStorage.getItem("role");
    const [inputValue, setInputValue] = useState('');
    const [artists, setArtists] = useState([]);
    const [isLoading, setIsLoading] = useState(true); // Add loading state
   

    const handleInputChange = (event) => {
        setInputValue(event.target.value);
    };

    const handleButtonClick = () => {
        //posalji rijec na search pagination
        navigate(`/AdminSearchArtist/${inputValue}`);

    };

    const [updateContent, setUpdateContent] = useState(false);

    const fetchData = () => {
        getArtists();
    }

    useEffect(() => {
        if (updateContent) {
            fetchData(); 
            setUpdateContent(false); 
        }
    }, [updateContent]);

    const [currentPage, setCurrentPage] = useState(1);
    const [postPerPage, setPostPerPage] = useState(4);
    const indexOfLastPost = currentPage * postPerPage;
    const indexOfFirstPost = indexOfLastPost - postPerPage;
    var currentPosts = artists.slice(indexOfFirstPost, indexOfLastPost)

    const paginate = (pageNumber) => setCurrentPage(pageNumber);


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

    if (isLoading || !artists ) {
        return <Loader title="Loading..." />;
      }




    return (
        <div>
            {
                admin_role === "Admin" && artists != null ?
                    <div className="relative flex">
                        <Sidebar linkValue={linksAdmin} />
                        <div className="flex-1 flex flex-col bg-gradient-to-br from-black to-[#380646]">

                            <div className="flex flex-row justify-start items-center">
                                <FiSearch className="w-5 h-5 ml-4" />
                                <input value={inputValue} onChange={handleInputChange} id="search-field" placeholder="Search" t
                                    ype="text" className="flex-1 bg-transparent border-none outline-none placeholder-gray-500
                            text-base text-white p-4"
                                />



                            </div>
                            <button class="py-2.5 px-4 w-24 h-9 mt-2 ml-6 inline-flex justify-center items-center rounded-md border
                                 border-transparent font-semibold bg-purple-400 text-white hover:bg-purple-600 focus:outline-none 
                                 focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 transition-all text-sm"
                                onClick={handleButtonClick}>Search</button>


                            <div className="flex flex-col">
                                <div className="w-full flex justify-between items-center sm:flex-row flex-col mt-4 mb-10">
                                    <h1 className="font-bold text-3x1 text-white text-left">
                                        Welcome Admin
                                    </h1>
                                </div>


                                <div>
                                    <div className="flex flex-wrap sm:justify-start
                            justify-center ">
                                        {currentPosts?.map((item) => {
                                            return item.flag != null ? (

                                                <div className="flex flex-wrap sm:justify-start
                                    justify-center ml-6">

                                                    <div className='flex flex-col w-[200px]  p-4 bg-white/5 bg-opacity-80 backdrop-blur-sm 
                                                            animate-slideup rounded-lg cursor-pointer'>
                                                        <div className="relative w-full h-full group">

                                                            <img className="w-44 h-44" alt="song_img" src={item.img} />

                                                        </div>
                                                        <div className="flex justify-between mt-7">
                                                            <p className="font-semibold text-lg text-white truncate">
                                                                {item.name}
                                                            </p>

                                                            <div>
                                                                {item.flag === "inactive" ?
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
                                <div>

                                    <Pagination postPerPage={postPerPage} totalPosts={artists.length} paginate={paginate} />

                                </div>
                            </div>
                        </div>


                    </div>
                    : <Admin />}
        </div>
    )
}

export default AdminArtist;

