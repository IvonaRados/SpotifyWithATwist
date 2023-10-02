import React, { useState } from "react";
import { Link } from "react-router-dom";
import axios from 'axios';
import { useNavigate } from "react-router-dom";
import { Error, Loader, SongCard, Sidebar } from "../../components";
import { linksAdmin, linksArtist, linksUser } from "../../assets/constants";




const AddNewPlaylist = ({setIsActive, setUpdateContent}) => {
    const navigate = useNavigate();
    const [name, setName] = useState("");
    const role = localStorage.getItem("role");

    //const [id, setId] = useState("");


    function postData(e){
        e.preventDefault();
        const user_id = localStorage.getItem("id");
        const user_name = localStorage.getItem("username");

        const playlist = { name: name,
            username:user_name,
            flag:"private",
            songs: [],
            user: user_id};
        console.log(playlist);
        axios.post(`http://localhost:3002/playlist/addPlaylist`, playlist);
        setUpdateContent(true);
        setIsActive(false);

    }
    



    return (
    <div>
        {
        role ?
        <div className="fixed inset-0 z-50 flex justify-center  outline-none mt-40">
            <div className="relative mt-auto my-6 max-w-3xl">
            <div className="flex flex-col w-[500px] h-[300px] p-4
                                bg-[#8b659c] bg-opacity-80 animate-slideup rounded-lg cursor-pointer">
                    <form>
                        <div >
                            <input type="name" className="block w-full px-4 py-2 mt-2 text-black bg-white border rounded-md focus:border-purple-400 focus:ring-purple-300 focus:outline-none focus:ring focus:ring-opacity-40" 
                            id="name" aria-describedby="emailHelp" placeholder="Enter name of playlist"
                                onChange={(e) => setName(e.target.value)} />
                        </div>

                        <div className="flex items-center justify-end p-6 rounded-b">
                            <button
                                className="text-red-500 background-transparent font-bold uppercase px-6 py-2 text-sm outline-none focus:outline-none mr-1 mb-1 ease-linear transition-all duration-150"
                                type="button"
                                onClick={() => setIsActive(false)}
                            >
                                Close
                            </button>
                            <button
                                className="bg-emerald-500 text-white active:bg-emerald-600 font-bold uppercase text-sm px-6 py-3 rounded shadow hover:shadow-lg outline-none focus:outline-none mr-1 mb-1 ease-linear transition-all duration-150"
                                type="button"
                                onClick={postData} >Submit
                            </button>
                        </div>
                        
                       
                    </form>
                </div>

                
        </div>
        </div>
        : <Homepage/>}
    </div>

    )
}

export default AddNewPlaylist;

