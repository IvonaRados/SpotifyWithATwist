import { useLocation } from 'react-router-dom';
import React, { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { playPause, setActiveSong } from '../../redux/features/playerSlice';
import SongCardPlaylist from "../../components/SongCardPlaylist";
import { Sidebar, Loader } from '../../components';
import { linksUser } from "../../assets/constants";



const Playlist = (props) => {
    const dispatch = useDispatch();
    const {activeSong, isPlaying, genreListId } = useSelector((state) => state.player);
    const location = useLocation();
    const [isLoading, setIsLoading] = useState(true); 
    const current_user = localStorage.getItem("username");
    const img = localStorage.getItem("img");



    const apiList=[];

    const playlista = location.state.songs;
    const [updateContent, setUpdateContent] = useState(false);

    const fetchData = () => {
        fetchDataWithDelay();
    }

    useEffect(() => {
        if (updateContent) {
            fetchData(); 
            setUpdateContent(false); 
        }
    }, [updateContent]);

    


    const handlePauseClick = () => {
        dispatch(playPause(false))

    }
    const handlePlayClick = () => {
        dispatch(setActiveSong({ song, data, i }));
        dispatch(playPause(true));
        
    }
    playlista.forEach((song) => {
        apiList.push(song.api_key);
      })
    const [songs, setSongs] = useState([]);

    const apiKeyList = apiList; 

    const fetchDataWithDelay = async () => {
        try {     
            const songDataList = [];
        
        for (const apiKey of apiKeyList) {
            const response = await fetch(`https://shazam-core.p.rapidapi.com/v1/tracks/details?track_id=${apiKey}`, {
                method: 'GET',
                headers: {
                    'X-RapidAPI-Key': 'f541243e08msh894d0552d77fe04p1afc8ejsna1b45b3817d2',
                    'X-RapidAPI-Host': 'shazam-core.p.rapidapi.com'
                },
            });

            const data = await response.json();
            songDataList.push(data);
            await new Promise(resolve => setTimeout(resolve, 2000));
        }
        setSongs(songDataList);
        setIsLoading(false);
        } catch (error) {
            console.error('Error fetching song information:', error);
        }
    };
    
    useEffect(() => {
        fetchDataWithDelay();
    }, []);

    if (isLoading || !songs) {
        return <Loader title="Loading..." />;
      }



    /*
    if (apiList.length!=songs.length){
        return(
            <div className="w-full flex justify-center items-center flex-col">
                <h1 className="font-bold text-2x1 text-white mt-2">

                    Loading...</h1>
            </div>
        )
    }*/
    else{

        return (
            <div>
           
                <div className="relative flex">
                    <Sidebar linkValue={linksUser} username={current_user} img={img}/>
                    <div className="h-full overflow-y-scroll hide-scrollbar flex xl:flex-row flex-col-reverse">
                            <div className="px-8 h-full overflow-y-scroll hide-scrollbar flex xl:flex-row flex-col-reverse"></div>
                                <div className="flex flex-col">
                                
                                    
                                        <h2 className="font-bold   ml-96 mt-7
                                         text-4xl text-[#785881] border-gray-100 border-3">
                                            {location.state.name}
                                        </h2>
                                                                                        
                                    <div className="flex flex-wrap sm:justify-start
                                        justify-center gap-5 mt-5">
                            
                        
                                    {songs?.map((song, i ) => (
                                        <SongCardPlaylist
                                        key={song.key}
                                        song={song}
                                        isPlaying = {isPlaying}
                                        activeSong = {activeSong}
                                        data={songs}
                                        playlista={location.state}
                                        i={i}
                                        setUpdateContent={setUpdateContent} 

                                    />
                                
                                
                            ))}
                    

                </div>
                </div>
                </div>
                </div>
                </div>
        )
    }
}
//{getSongbyKey(song.api_key)}

export default Playlist;

