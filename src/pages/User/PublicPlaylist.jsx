import { Error, Loader, SongCard, Sidebar } from "../../components";
import React, { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link } from 'react-router-dom';
import { useNavigate } from "react-router-dom";
import axios from 'axios';
import { linksUser } from "../../assets/constants";
import { FaUserCheck } from "react-icons/fa";
import { MdPublic, MdPublicOff, MdOutlineDeleteOutline, MdPlaylistAdd } from "react-icons/md";




const PublicPlaylist = () => {
    const dispatch = useDispatch();
    const { activeSong, isPlaying, genreListId } = useSelector((state) => state.player);

    const current_user = localStorage.getItem("username")
    const current_user_id = localStorage.getItem("id")
    const role = localStorage.getItem("role");
    const img = localStorage.getItem("img");


    const navigate = useNavigate();
    const [value, setValue] = useState(false)
    const [user, setUser] = useState(null);
    const [isLoading, setIsLoading] = useState(true); // Add loading state
    const [updateContent, setUpdateContent] = useState(false);

    // Function to fetch and update the data
    const fetchData = () => {
        // Fetch data here (e.g., getSongs, getNews, getArtist)
        // Update the state with the new data
        // This will trigger a re-render with the updated data
        getUser();
        getPlaylists();
        
    }

    // Use `useEffect` to listen to changes in `updateContent` state
    useEffect(() => {
        if (updateContent) {
            fetchData(); // Call the fetchData function when updateContent changes
            setUpdateContent(false); // Reset the updateContent flag
        }
    }, [updateContent]);
    
    function getUser() {
        
        const response = fetch(
            `http://localhost:3002/user/${current_user_id}`
        ).then((value) => value.json().then((user) => { setUser(user); setIsLoading(false); }))
        //console.log("User: ", user);
    }

    useEffect(() => {
        getUser();
    }, []);

    const [playlists, setPlaylists] = useState([]);
    
    function getPlaylists() {

        const response = fetch(
            'http://localhost:3002/playlist'
        ).then((value) => value.json().then((playlists) => { setPlaylists(playlists);     setIsLoading(false);
        }))
        console.log(current_user_id, user, playlists);
    }


    useEffect(() => {
        getPlaylists();
    }, []);



    function postData(value) {
        //e.preventDefault();

        console.log("ID izvodaca kojeg se zeli pratiti", value);
        console.log("ID trenutnog usera", user.email);
        console.log("Koga sve prate", user.playlists_follow);


        var edit_playlist = user.playlists_follow;

        console.log("Before", edit_playlist);
        //[{"api_key":"659236090"}]
        const playlist = {}
        playlist._id = value;
        edit_playlist.push(playlist);

        console.log("After", edit_playlist)

        axios.put(`http://localhost:3002/user/editUserPlaylist/${user._id}`, edit_playlist)
            .then(response => {
                console.log(response);
            })
            .catch(error => {
                console.log(error);
            });
            setUpdateContent(true);

    }

    function deleteData(value) {

        var edit_playlist = user.playlists_follow;

        edit_playlist = edit_playlist.filter(playlist => playlist._id !== value)
        console.log(edit_playlist);

        axios.put(`http://localhost:3002/user/editUserPlaylist/${user._id}`, edit_playlist)
            .then(response => {
                console.log(response);
            })
            .catch(error => {
                console.log(error);
            });
            setUpdateContent(true);

    }

    if (isLoading || !user) {
        return <Loader title="Loading..." />;
      }


    return (
        <div>
            {
                role ?
                    <div className="relative flex">
                        <Sidebar linkValue={linksUser} username={current_user} img={img} />
                        <div className="flex flex-col">

                            <br></br>
                            <div className="flex flex-wrap sm:justify-start
                                justify-center gap-8">

                                <div className='flex flex-col w-[900px] p-4
                                bg-white/5 bg-opacity-80 
                                animate-slideup rounded-lg cursor-pointer ml-40'>


                                    <div className="flex flex-wrap sm:justify-start
                                        justify-center">

                                        {playlists.map((item) => {

                                            return item.flag === "public" ? (
                                                <div className="flex flex-wrap sm:justify-start
                                                    justify-center">

                                                    <div className='flex flex-col w-[600px] p-4 bg-white/5 bg-opacity-80 hover:bg-[#543662] backdrop-blur-sm 
                                                                            animate-slideup rounded-lg cursor-pointer mt-7 ml-8'>
                                                        <div className="flex justify-between font-semibold text-lg text-white truncate">
                                                            <div>
                                                                <p className="font-semibold text-lg text-white truncate">
                                                                    <Link to="/myPlaylist/${item.name}" state={item}>
                                                                        {item.name}
                                                                    </Link>

                                                                </p>
                                                                <p className="font-semibold text-sm text-white truncate">
                                                                    Creator: {item.username}
                                                                </p>
                                                            </div>
                                                            <div>
                                                                {
                                                                    item.user === current_user_id ?
                                                                    <FaUserCheck className="btn btn-primary w-6 h-6 mt-2 " />

                                                                        :
                                                                        <div>
                                                                            {
                                                                                user.playlists_follow.some(playlist => playlist._id === item._id) ?

                                                                                    <p className="font-semibold text-lg text-white truncate">

                                                                                        <MdOutlineDeleteOutline onClick={() => deleteData(item._id)} className="btn btn-primary w-6 h-6 mt-2 " />

                                                                                    </p>
                                                                                    :
                                                                                    <p className="font-semibold text-lg text-white truncate">
                                                                                        <MdPlaylistAdd onClick={() => postData(item._id)} className="btn btn-primary w-6 h-6 mt-2 " />

                                                                                    </p>

                                                                            }
                                                                        </div>
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
                            </div>
                        </div>
                    </div>
                    : <Homepage />}
        </div>

    )
}

export default PublicPlaylist;

