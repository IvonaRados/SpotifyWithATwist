import { Error, Loader, SongCard, Sidebar } from "../../components";
import { useLocation, useNavigate } from 'react-router-dom';
import React, { useState, useEffect } from "react";
import { Discover } from "..";
import axios from 'axios';
import { linksUser, linksArtist } from "../../assets/constants";
//User vidi stranicu jednog izvođaca i njegove pjsem
import { HiThumbUp, HiThumbDown, HiHeart, HiOutlineHeart } from 'react-icons/hi';

import { MdOutlineDeleteOutline } from "react-icons/md";
import { MdOutlineSubtitlesOff } from "react-icons/md";
import { FiMicOff } from "react-icons/fi";


const AllUsers = (props) => {
    const location = useLocation();
    const id = localStorage.getItem("id");
    const role = localStorage.getItem("role");
    const current_user= localStorage.getItem("username");
    const img = localStorage.getItem("img");

    const [isLoading, setIsLoading] = useState(true); // Add loading state

    const [users, setUsers] = useState([]);

    function getUsers() {
        const response = fetch(
            `http://localhost:3002/users`
        ).then((value) => value.json().then((users) => { setUsers(users); setIsLoading(false); }))
    }

    useEffect(() => {
        getUsers();
    }, []);

    



    if (isLoading || !users ) {
        return <Loader title="Loading..." />;
      }

    return (
        <div>
            {
                role === "User" ?
                    <div className="relative flex">
                        <Sidebar linkValue={linksUser} username={current_user} img={img}/>
                        <div className="flex flex-col">
                                <div className="flex flex-wrap sm:justify-start
                            justify-center">
                                <div className='flex flex-wrap w-[900px] p-4
                                bg-white/5 bg-opacity-80 backdrop-blur-sm 
                                animate-slideup rounded-lg cursor-pointer ml-40 mt-8'>

                                    {users.map((item) => {

                                        return item._id !== id && item.role!=="Admin" ? (
                                            <div className="flex flex-wrap sm:justify-start
                                                    justify-center ">
                                                         <div className='flex flex-col w-[300px] p-4 bg-white/5 bg-opacity-80 hover:bg-[#543662] backdrop-blur-sm 
                                                                            animate-slideup rounded-lg cursor-pointer mt-7 ml-20'>

                                                        <div className="flex justify-between font-semibold text-lg text-white ">
                                                            <img 
                                                                alt="art"
                                                                src={item.img}
                                                                className='sm:w-32 w-28 sm:h-32 h-28 rounded-full
                                                                object-cover justify-center border-red-500 ml-8'
                                                            />
                                                            <p className="ml-auto">
                                                                <p className=" font-semibold text-lg text-white truncate">
                                                                    {item.username}
                                                                </p>
                                                                
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

                        </div>
                        
                    </div>
                    
                    : <Discover />}
        </div>
    )

}

export default AllUsers;

