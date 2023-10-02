import { Error, Loader, SongCard, Sidebar } from "../../components";
import React, { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link} from 'react-router-dom';
import { useNavigate } from "react-router-dom";
import axios from 'axios';
import { linksUser } from "../../assets/constants";
import { HiThumbUp, HiThumbDown, HiHeart, HiOutlineHeart } from 'react-icons/hi';




const Favorites = () => {
    const dispatch = useDispatch();
    const {activeSong, isPlaying, genreListId } = useSelector((state) => state.player);
    
    const current_user = localStorage.getItem("username")
    const current_user_id = localStorage.getItem("id")
    const role = localStorage.getItem("role");
    const img = localStorage.getItem("img");

    const [user, setUser] = useState([]);
    const [song, setSong] = useState([]);
    const [artists, setArtists] = useState([]);
    const [songs, setSongs] = useState([]);

    const [artist, setArtist] = useState([]);
    const [isLoading, setIsLoading] = useState(true); // Add loading state
    const [updateContent, setUpdateContent] = useState(false);

    // Function to fetch and update the data
    const fetchData = () => {
        // Fetch data here (e.g., getSongs, getNews, getArtist)
        // Update the state with the new data
        // This will trigger a re-render with the updated data
        getSongs();
        getUser();
        getArtists();
        getFavorites();
    }

    // Use `useEffect` to listen to changes in `updateContent` state
    useEffect(() => {
        if (updateContent) {
            fetchData(); // Call the fetchData function when updateContent changes
            setUpdateContent(false); // Reset the updateContent flag
        }
    }, [updateContent]);


    const navigate = useNavigate();


    const [favorites, setFavorites] = useState([]);

    
    function getArtists() {
        
        const response = fetch(
            'http://localhost:3002/composers/all'
        ).then((value) => value.json().then((artist) => { setArtists(artist); setIsLoading(false); }))
        console.log("Artists: ", artists);
    }

    useEffect(() => {
        getArtists();
    }, []);

    function getSongs() {
        
        const response = fetch(
            'http://localhost:3002/composers/songs'
        ).then((value) => value.json().then((songs) => { setSongs(songs); setIsLoading(false); }))
    }
    useEffect(() => {
        getSongs();
    }, []);


    function getFavorites() {
        
        const response = fetch(
            'http://localhost:3002/favorites'
        ).then((value) => value.json().then((favorites) => { setFavorites(favorites); setIsLoading(false); }))
        console.log(current_user_id, current_user);
    }
    

    useEffect(() => {
        getFavorites();
    }, []);


   
    function getUser() {
        
        const response = fetch(
            `http://localhost:3002/user/${current_user_id}`
        ).then((value) => value.json().then((user) => { setUser(user); setIsLoading(false); }))
        //console.log("User: ", user);
    }

    useEffect(() => {
        getUser();
    }, []);

    const deleteDataFavorites= async(object)=>{
        let fav_id;
        console.log(favorites)
        favorites?.some((obj) => {
            if (obj.user === user._id && obj.song_key === object.song_key){
                fav_id=obj._id
                console.log(fav_id);
            }
        
        })


        if (object.song_key.length<10){
            console.log("Real song")

        }
        else{
            console.log("My song")
            var mysong;
            var myartist
            const response = await fetch(
                `http://localhost:3002/composers/songs/${object.song_key}`
            ).then((value) => value.json().then((song) => { mysong=song }))
            console.log(mysong);

            console.log("My artist")
            const response2 = await fetch(
                `http://localhost:3002/composer/${object.composer}`
            ).then((value) => value.json().then((artist) => { myartist=artist }))
            console.log(myartist);

            const likes = {likes:mysong.likes-1};
            axios.put(`http://localhost:3002/newArtist/editSong/${object.song_key}`, likes)
                .then((response) => {
                    console.log(response);
                })
                .catch(error => {
                    console.log(error);
                });

            const totalSongs = myartist.totalSongs;
            const totalLikes = myartist.totalLikes-1;
        
            axios.put(`http://localhost:3002/editNumberSongs/${object.composer}`, {totalSongs, totalLikes})
                    .then(response => {
                        console.log(response);
                    })
                    .catch(error => {
                        console.log(error);
                    });

        }

        axios.delete(`http://localhost:3002/favorites/deletefavorites/${fav_id}`);
        console.log("Deleted from favorites");  
        setUpdateContent(true);
      }

    
    const songsActivated = [];

    favorites.forEach(fav => {
        if(fav.composer){ //provjera ako se radi o pravoj pjesmi da se preskoci provjera

            const artist = artists.find(item => item._id === fav.composer);
            const song2 = songs.find(item => item._id === fav.song_key);
            //console.log(artist);
            if(artist?.flag == "active" && song2?.flag == "active" )
            {
                songsActivated.push(fav);
            }
        }
        else{
            songsActivated.push(fav);
        }
        
    })
    console.log(songsActivated);

    if (isLoading) {
        return <Loader title="Loading..." />;
      }


    return (
    <div>
        {
            role ?
                <div className="relative flex">
                    <Sidebar linkValue={linksUser} username={current_user} img={img}/>    
                    <div className="flex flex-wrap sm:justify-start justify-center">       
                                {songsActivated.map((item) => {        
                                    return current_user_id===item.user  ? ( 
                                        <div className="flex flex-wrap sm:justify-start
                                    justify-center gap-8">                               
                                        
                                        <div className='flex flex-col w-[210px] p-4 bg-white/5 bg-opacity-80 backdrop-blur-sm 
                                                            animate-slideup rounded-lg cursor-pointer mt-7 ml-8'>
                                            <div className="relative w-full  group">
                                                            
                                                <img className="w-60 h-48" alt="song_img" src ={item.img} />

                                            </div>
                        
                                            <div className="mt-6 flex flex-col">
                                                <p className="font-semibold text-lg text-white truncate">
                                                    <Link to={`/songs/${item.song_key}`}>
                                                    {item.name}
                                                    </Link>
                                        
                                                </p>
                                                <p className='text-sm truncate text-gray-300 mt-1'>
                                                    {item.name_composer}
                                        
                                                </p>
                                                <p className="font-semibold text-lg text-white truncate mr-8">
                
                                                    <HiHeart onClick={() =>deleteDataFavorites(item)} className="btn btn-primary w-6 h-6 mr-2" />
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
        : <Homepage/>
        }
    </div>

    )
}

export default Favorites;

