import { Error, Loader, SongCard,TopPlay, Sidebar, Searchbar, PopUp } from "../../components";
import { genres} from '../../assets/constants';
import { selectGenreListId } from "../../redux/features/playerSlice";
import { useDispatch, useSelector } from "react-redux";
import { useGetSongsByGenreQuery } from "../../redux/services/shazamCore";
import { useState, useEffect } from "react";
import { Homepage } from "..";
import {HiThumbUp, HiThumbDown, HiHeart, HiOutlineHeart } from 'react-icons/hi';
import { linksUser } from "../../assets/constants";
import axios from 'axios';

const Discover = () => {
    const dispatch = useDispatch();
    const {activeSong, isPlaying, genreListId } = useSelector((state) => state.player);
    const [isActive, setIsActive] = useState(false);
    const [settingsong, setSong] = useState(false);

  // Function to toggle the popup visibility
    const togglePopup = () => {
        setIsActive(!isActive);
    };
    
    const [songs, setSongs] = useState([]);
    const [artists, setArtists] = useState([]);
    const [songsActive, setSongsactive] = useState([]);
    const [favorites, setFavorites] = useState([]);

    const {data, isFetching, error} = useGetSongsByGenreQuery
    (genreListId || 'POP ');
    const genreTitle = genres.find(({value}) => value === genreListId)?.title;

    const [updateContent, setUpdateContent] = useState(false);

    // Function to fetch and update the data
    const fetchData = () => {
        // Fetch data here (e.g., getSongs, getNews, getArtist)
        // Update the state with the new data
        // This will trigger a re-render with the updated data
        getSongs();
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

     
    useEffect(() => {
        getArtists();
    }, []);
    
    function getArtists() {
        
        const response = fetch(
            'http://localhost:3002/composers/all'
        ).then((value) => value.json().then((artist) => { setArtists(artist) }))
        console.log("Artists: ", artists);
    }


    
    useEffect(() => {
        getFavorites();
    }, []);


    function getFavorites() {
        
        const response = fetch(
            'http://localhost:3002/favorites'
        ).then((value) => value.json().then((favorites) => { setFavorites(favorites) }))
    }


    function getSongs() {
        
        const response = fetch(
            'http://localhost:3002/composers/songs'
        ).then((value) => value.json().then((songs) => { setSongs(songs) }))
    }
    useEffect(() => {
        getSongs();
    }, []);
    const topComposers = [];

    artists.forEach(artist => {
        console.log(artist.totalLikes)
        if(artist.totalLikes>5)         //dodati i provjeru da li je aktivan flag
            topComposers.push(artist._id);

      })

    const songsActivated = [];

    songs.forEach(song => {
        const artist = artists.find(item => item._id === song.composer);
        //console.log(artist);
        if((artist.flag == "active" && song.flag == "active" && song.likes>2) || (artist.flag == "active" && song.flag == "active" && artist.totalLikes > 4))
        {
            songsActivated.push(song);
        }
    })



      //napraviti jos jednu petlju gdje se za svaku pjesmu koja ima preko nekog broja lajkova trazi njezin kompozitor i da li je njegova
      //flag oznaka aktivna. Također usporeduje da li je i sama pjesma deaktivirana

    //console.log("Top composers", songsActivated);

    songsActivated.map((item) => {
        console.log(item.name);
    })

    const current_user = localStorage.getItem("username");
    const role = localStorage.getItem("role");
    const current_user_id = localStorage.getItem("id");
    const img = localStorage.getItem("img");

    console.log(img);

    const postDataFavorites=(object)=>{
        
        const user_id = localStorage.getItem("id");
        console.log(object.likes);
        
        const favorites = { name: object.name, song_key:object._id , img:object.img,name_composer: object.nameofcomposer, user:user_id, composer: object.composer };
        const likes = {likes:object.likes+1};
        console.log(likes);
        //console.log(favorites)
        
        axios.post(`http://localhost:3002/favorites/addFavorites`, favorites);


        axios.put(`http://localhost:3002/newArtist/editSong/${object._id}`, likes)
                .then(response => {
                    console.log(response);
                })
                .catch(error => {
                    console.log(error);
                });
        const artist = artists.find(item => item._id === object.composer);

        const totalSongs = artist.totalSongs;
        const totalLikes = artist.totalLikes+1;

        axios.put(`http://localhost:3002/editNumberSongs/${artist._id}`, {totalSongs, totalLikes})
                .then(response => {
                    console.log(response);
                })
                .catch(error => {
                    console.log(error);
                });    
        console.log("Added in favorites");
        setUpdateContent(true);
      }


    const deleteDataFavorites=(object)=>{
        const favorite = favorites.find(fav => fav.user === current_user_id && fav.song_key===object._id) ;
        

        axios.delete(`http://localhost:3002/favorites/deletefavorites/${favorite._id}`);

        const likes = {likes:object.likes-1};
        axios.put(`http://localhost:3002/newArtist/editSong/${object._id}`, likes)
                .then(response => {
                    console.log(response);
                })
                .catch(error => {
                    console.log(error);
                });

        const artist = artists.find(item => item._id === object.composer);

        const totalSongs = artist.totalSongs;
        const totalLikes = artist.totalLikes-1;

        axios.put(`http://localhost:3002/editNumberSongs/${artist._id}`, {totalSongs, totalLikes})
                .then(response => {
                    console.log(response);
                })
                .catch(error => {
                    console.log(error);
                });


        console.log("Deleted from favorites");
        setUpdateContent(true);

        
      }



    if (isFetching) return <Loader title="Loading songs..." />;

    if (error) return <Error />

    return (
        <div>
            {
                role ?
                <div className="relative flex">
                    <Sidebar linkValue={linksUser}
                    username={current_user} img={img}/>
                                            
                        <div className="px-10 flex-1 flex flex-col bg-gradient-to-br from-black to-[#380646]">
                        <Searchbar />
                        <div className="h-full overflow-y-scroll hide-scrollbar flex xl:flex-row flex-col-reverse">
                            <div className="px-8 h-full overflow-y-scroll hide-scrollbar flex xl:flex-row flex-col-reverse"></div>
                            <div className="flex flex-col">
                            
                                <div className="w-full flex justify-end items-center sm:flex-row flex-col  mb-10">
                                    
                                    <select onChange={(e) => dispatch(selectGenreListId(e.target.value))}
                                    value={genreListId || 'pop'}
                                    className="bg-black text-gray-300 p-3 text-sm rounded-lg outline-none sm:mt-0 mt-5"
                                    >
                                    {genres.map((genre) => <option key= {genre.value}
                                    value={genre.value}>{genre.title}</option>)}
                                    </select>
                                </div>
                               


                                <div className="flex flex-wrap sm:justify-start
                                        justify-center gap-8">
                                            
                                        {songsActivated.map((item) => (
                                         
                                                <div className="flex flex-wrap sm:justify-start
                                                justify-center gap-2">                               
                                                        
                                                    <div className='flex flex-col w-[200px] w- fullp-4 
                                                                        animate-slideup rounded-lg cursor-pointer'>
                                                        <div className="relative w-full h-full group">
                                                
                                                            <img className="w-60 h-48" alt="song_img" src ={item.img} />

                                                        </div>
                                                        <div className="mt-4 flex flex-col">
                                                            <p className="font-semibold text-lg text-white truncate">
                                                                {item.name}
                                                            </p>
                                                            </div>

                                                            <div className="flex justify-between">
                                                                <p className='text-sm truncate text-gray-300 mt-1'>
                                                                    {item.nameofcomposer}
                                                                </p>
                                                                <p className='text-sm truncate text-gray-300 mt-1'>
                                                                    {    favorites.some(fav => (fav.user === current_user_id && fav.song_key === item._id)) ?

                                                                                <HiHeart className="btn btn-primary  text-gray-300 mt-2  w-6 h-6" onClick={() => deleteDataFavorites(item)}  />
                                                                            :
                                                                            <HiOutlineHeart className="btn btn-primary  text-gray-300 mt-2  w-6 h-6"onClick={() => postDataFavorites(item)}  />

                                                                        }
                                                                </p>
                                                            </div>

                                                            
                                                        
                                                    
                                                    </div>
                            
                                                </div>
                                                
                                            
                                        ))}
                                    </div>
                                    <br></br>
                                

                                <div className="flex flex-wrap sm:justify-start
                                justify-center gap-8">
                                    {data?.map((song, i ) => (
                                        <div key={song.key}>
                                        <SongCard
                                          key={song.key}
                                          song={song}
                                          isPlaying={isPlaying}
                                          activeSong={activeSong}
                                          data={data}
                                          i={i}
                                          isActive={isActive}
                                          setIsActive={setIsActive}
                                          setSong={setSong}
                                        />
                                        {isActive && (
                                          <PopUp linkValue={settingsong} 
                                          setIsActive={setIsActive}
                                          />
                                        )}
                                      </div>
                                    ))}

                                </div>
                            </div>
                            
                                
                        </div>
                        
                    </div>
                    <div className="xl:sticky relative  top-20 h-fit">
                                    <TopPlay />
                                </div>
                </div>
                
            : <Homepage/>}
        </div>
    )
}

export default Discover;

