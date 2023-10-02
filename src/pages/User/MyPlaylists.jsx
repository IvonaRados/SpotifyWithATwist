import { Loader, SongCard, Sidebar } from "../../components";
import React, { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link } from 'react-router-dom';
import axios from 'axios';
import { linksUser } from "../../assets/constants";
import { MdPublic, MdPublicOff, MdOutlineDeleteOutline } from "react-icons/md";
import AddNewPlaylist from "./AddNewPlaylist";


const MyPlaylists = () => {
    const dispatch = useDispatch();
    const { activeSong, isPlaying, genreListId } = useSelector((state) => state.player);
    const [isLoading, setIsLoading] = useState(true); 
    
    const current_user_id = localStorage.getItem("id")
    const role = localStorage.getItem("role");
    const current_user = localStorage.getItem("username");
    const img = localStorage.getItem("img");

    const [playlists, setPlaylists] = useState([]);
    const [user, setUser] = useState(null);
    const [users, setUsers] = useState([]);

    const [isActive, setIsActive] = useState(false);
    const [updateContent, setUpdateContent] = useState(false);

    // Function to fetch and update the data
    const fetchData = () => {
        // Fetch data here (e.g., getSongs, getNews, getArtist)
        // Update the state with the new data
        // This will trigger a re-render with the updated data
        getUser();
        getUsers();
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

    function getUsers() {
        
        const response = fetch(
            `http://localhost:3002/users`
        ).then((value) => value.json().then((users) => { setUsers(users); setIsLoading(false); }))
    }

    useEffect(() => {
        getUsers();
    }, []);



    function getPlaylists() {

        const response = fetch(
            'http://localhost:3002/playlist'
        ).then((value) => value.json().then((playlists) => { setPlaylists(playlists);     setIsLoading(false);
        }))
    }

    
    useEffect(() => {
        getPlaylists();
    }, []);


    function addPublic(value) {
        const flag = "public";
        axios.put(`http://localhost:3002/editPlaylist/publicprivate/${value}`, { flag })
            .then(response => {
                console.log(response);
            })
            .catch(error => {
                console.log(error);
            });

        setUpdateContent(true);
    }

    function addPrivate(value) {
        const flag = "private";

        axios.put(`http://localhost:3002/editPlaylist/publicprivate/${value}`, { flag })
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

        axios.put(`http://localhost:3002/user/editUserPlaylist/${user._id}`, edit_playlist)
            .then(response => {
                console.log(response);
            })
            .catch(error => {
                console.log(error);
            });
            setUpdateContent(true);
        }

    const deleteMyData = async (object) => {

        axios.delete(`http://localhost:3002/playlist/delete/${object._id}`);
        //console.log(object._id);
        var edit_playlist = user.playlists_follow;
        edit_playlist = edit_playlist.filter(playlist => playlist._id !== object._id)
        console.log(edit_playlist);

        users.map((user) => {
            const deleted_playlist = user.playlists_follow.find(playlist => playlist._id === object._id)
            if (deleted_playlist)  //znaci da postoji u nizu i da ga treba maknuti
            {
                console.log("found: " + object.name + "in user: " + user.email)

                var edit_playlist = user.playlists_follow;
                edit_playlist = edit_playlist.filter(playlist => playlist._id !== object._id)
                console.log(edit_playlist);
                axios.put(`http://localhost:3002/user/editUserPlaylist/${user._id}`, edit_playlist)
                    .then(response => {
                        console.log(response);
                    })
                    .catch(error => {
                        console.log(error);
                    });
            }
        })



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
                        <Sidebar linkValue={linksUser} username={current_user} img={img}/>
                        <div className="flex flex-col">
                            
                            <br></br>
                            <div className="flex flex-wrap sm:justify-start
                                justify-center gap-12">

                                <div className='flex flex-col w-[900px] p-4
                                bg-white/5 bg-opacity-80 backdrop-blur-sm 
                                animate-slideup rounded-lg cursor-pointer ml-40 mt-8'>

                                    <h2>My Playlists</h2>

                                    <div className="flex flex-wrap sm:justify-start
                                        justify-center">


                                        {playlists.map((item) => {

                                            return current_user_id === item.user ? (

                                                <div className="flex flex-wrap sm:justify-start
                                                    justify-center gap-8">

                                                    <div className='flex flex-col w-[600px] p-4 bg-white/5 bg-opacity-80 hover:bg-[#543662] backdrop-blur-sm 
                                                                            animate-slideup rounded-lg cursor-pointer mt-7 ml-8'>


                                                        <div className="flex justify-between">
                                                            <p className="font-semibold text-lg text-white truncate">
                                                                <Link to="/myPlaylist/${item.name}" state={item}>
                                                                    {item.name}
                                                                </Link>
                                                            </p>
                                                            <p className="flex justify-between font-semibold text-lg text-white truncate">
                                                                <div>
                                                                    {item.flag === "private" ?
                                                                        <p className="font-semibold text-lg text-white truncate mr-8">
                                                                            <MdPublic onClick={() => addPublic(item._id)} className="btn btn-primary w-6 h-6 mt-2" />
                                                                        </p>

                                                                        :
                                                                        <p className="font-semibold text-lg text-white truncate mr-8">
                                                                            <MdPublicOff onClick={() => addPrivate(item._id)} className="btn btn-primary w-6 h-6 mt-2" />
                                                                        </p>
                                                                    }
                                                                </div>
                                                                <p className='font-semibold text-lg text-white truncate '>

                                                                    <MdOutlineDeleteOutline onClick={() => deleteMyData(item)} className="btn btn-primary w-6 h-6 mt-2" />

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
                                    <div className="w-full flex sm:flex-row flex-col mt-8 ml-8">

                                       
                                        <button onClick={() => {setIsActive(!isActive)}} type="button1" class="py-2.5 px-4 inline-flex justify-center items-center gap-2 rounded-md border border-transparent font-semibold bg-purple-400 text-white hover:bg-purple-600 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 transition-all text-sm">
                                                Add new playlist!
                                            
                                        </button>
                                        {isActive && (
                                          <AddNewPlaylist  
                                          setIsActive={setIsActive}
                                          setUpdateContent={setUpdateContent}
                                          />
                                        )}
                                      </div>
                                    </div>

                                </div>
                                <br></br>
                                <div className='flex flex-col w-[900px] p-4
                                bg-white/5 bg-opacity-80 
                                animate-slideup rounded-lg cursor-pointer ml-40 '>
                                    <p>Others Playlist</p>
                                    <div className="flex flex-wrap sm:justify-start
                                        justify-center">



                                        {playlists.map((item) => {

                                            return user.playlists_follow.some(playlist => playlist._id === item._id) ? (

                                                <div className="flex flex-wrap sm:justify-start
                                                    justify-center gap-8">
                                                    <div className='flex flex-col w-[600px] p-4 bg-white/5 bg-opacity-80 hover:bg-[#543662]   
                                                                            animate-slideup rounded-lg cursor-pointer mt-7 ml-8'>



                                                        <div className="flex justify-between">
                                                            <p className="font-semibold text-lg text-white truncate">
                                                                <Link to="/myPlaylist/${item.name}" state={item}>
                                                                    {item.name}
                                                                </Link>

                                                            </p>
                                                            <p className="font-semibold text-lg text-white truncate">
                                                            <MdOutlineDeleteOutline onClick={() => deleteData(item._id)} className="btn btn-primary w-6 h-6 mt-2 " />
                                                            </p>
                                                            
                                                        </div>
                                                        <p className="font-semibold text-sm text-white truncate">
                                                                    Creator: {item.username}

                                                            </p>

                                                        
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
                    : <Homepage />}
        </div>

    )
}

export default MyPlaylists;

