import { Link } from "react-router-dom";
import React, { useState, useEffect } from "react";
import { Sidebar, Loader } from "../../components";
import { useNavigate } from "react-router-dom";
import { linksUser } from "../../assets/constants";
import axios from "axios";
//User vidi samo one izvođace koje prati i njihove vjesti
import { HiUserAdd, HiUserRemove } from "react-icons/hi";
import { FiMicOff } from "react-icons/fi";


const NewArtistsFollow = () => {
    const navigate = useNavigate();
    const [name, setName] = useState("");
    //const [id, setId] = useState("");
    
    const user_id = localStorage.getItem("id");
    const user_name = localStorage.getItem("username");
    const role = localStorage.getItem("role");
    const img = localStorage.getItem("img");

    console.log(role, user_name);
    const [isLoading, setIsLoading] = useState(true); // Add loading state
    

    const [artists, setArtists] = useState(null);
    const [news, setNews] = useState([]);
    const [user, setUser] = useState(null);
    const [updateContent, setUpdateContent] = useState(false);

    const fetchData = () => {
        getUser();
        getArtists();
        getNews();
    }

    useEffect(() => {
        if (updateContent) {
            fetchData(); 
            setUpdateContent(false); 
        }
    }, [updateContent]);

    
    
    function getUser() {
        
        const response = fetch(
            `http://localhost:3002/user/${user_id}`
        ).then((value) => value.json().then((user) => { setUser(user); setIsLoading(false); }))
        //console.log("User: ", user);
    }

    useEffect(() => {
        getUser();
    }, []);

      
    function getArtists() {
        
        const response = fetch(
            'http://localhost:3002/composers/all'
        ).then((value) => value.json().then((artist) => { setArtists(artist); setIsLoading(false); }))
        console.log("Artists: ", artists);
    }

    useEffect(() => {
        getArtists();
    }, []);

    

    function getNews() {
        
        const response = fetch(
            'http://localhost:3002/composers/news'
        ).then((value) => value.json().then((news) => { setNews(news); setIsLoading(false);
        }))
        console.log("News: ", news);
    }

    
    useEffect(() => {
        getNews();
    }, []);


    function deleteData(value){
        var edit_playlist=user.new_composers_follow;

        edit_playlist = edit_playlist.filter(composer => composer._id !== value)

        axios.put(`http://localhost:3002/user/editUser/${user._id}`, edit_playlist)
                .then(response => {
                    console.log(response);
                })
                .catch(error => {
                    console.log(error);
                });
        setUpdateContent(true); 
      }

      if (isLoading || !user || !artists) {
        return <Loader title="Loading..." />;
      }

    return (
        <div>
            {
                role==="User" ?
                <div className="relative flex">
                    <Sidebar linkValue={linksUser} username={user_name} img={img}/>
                    <div className="flex flex-col">
                        
                        <div>
                            <div className="flex flex-wrap sm:justify-start
                                justify-center ">
                                    
                                {artists.map((item) => {
                                    return role==="User" && user.new_composers_follow.some(composer => composer._id === item._id) ? ( 
                                        <div>
                                        {item.flag =="active" ?
                                    
                                            <div className="flex flex-wrap sm:justify-start
                                            justify-center ml-8 mt-8">                               
                                                    
                                                    <div className='flex flex-col w-[210px] p-4 bg-white/5 bg-opacity-80 backdrop-blur-sm 
                                                                animate-slideup rounded-lg cursor-pointer'>
                                                    <div className="relative w-full h-full group">
                                                        
                                                        <img className="w-60 h-48" alt="song_img" src ={item.img} />

                                                    </div>
                                                    <div className="flex justify-between mt-7">
                                                        <p className="font-semibold text-lg text-white truncate">
                                                        <Link to={`/artist/${item?._id}`} state={ item._id }>
                                                            {item.name}
                                                        </Link>

                                                        </p>
                                                    
                                                    
                                                    <p className="font-semibold text-lg text-white truncate">
                                                        <HiUserRemove onClick={() => deleteData(item._id)} className="btn btn-primary w-6 h-6 mt-2" />

                                                        </p>
                                                        </div>
                                                </div>
                                            </div>:
                                            <div className="flex flex-wrap sm:justify-start
                                            justify-center ml-8 mt-8">                               
                                                    
                                                <div className='flex flex-col w-[210px] p-4 bg-white/5 bg-opacity-80 backdrop-blur-sm 
                                                                    animate-slideup rounded-lg cursor-pointer'>
                                                    <div className="relative w-full h-full group">
                                                        
                                                        <img className="w-60 h-48" alt="song_img" src ={item.img} />

                                                    </div>
                                                    <div className="flex justify-between ">
                                                        <p className="font-semibold text-lg text-white truncate">

                                                            {item.name}
                                                        

                                                        </p>
                                                        
                                                        <p className="font-semibold text-lg text-white truncate">
                                                        <HiUserRemove onClick={() => deleteData(item._id)} className="btn btn-primary w-6 h-6 mt-2" />

                                                        </p>
                                                    
                                                    </div>
                                                    <div className="flex font-semibold text-lg text-white truncate">

                                                    <FiMicOff className="btn btn-primary  text-gray-300 mt-1  w-6 h-6" />

                                                        
                                                    </div>
                                                    
                                                </div>
                                            </div>
                                        }
                                        </div>) : ( 
                                            <div></div>
                                        );
                                        
                                    
                                })}
                            </div>
                        </div>

                        

                    </div>
                    <div className="md:flex  flex-col w-[400px] ml-auto mr-8 mt-16 rounded-lg
                                py-10 px-4 bg-white/5 bg-opacity-80">
                            {news.map((item) => {
                                return role==="User" && user.new_composers_follow.some(composer => composer._id === item.composer) &&
                                                artists.some(artist => (artist.flag ==="active" && artist._id ===item.composer)) && 
                                                item.flag==="active" ? ( 

                                    <div className="flex flex-wrap sm:justify-start
                                    justify-center gap-8 mt-5">    
                                            
                                            <div className='flex flex-col p-4 bg-white/5 bg-opacity-80 backdrop-blur-sm 
                                                        animate-slideup rounded-lg cursor-pointer'>
                                        
                                        <div className="flex flex-col">
                                            <p className="font-semibold text-lg text-white ">
                                                {item.title_of_article} 
                                            

                                            </p>
                                            <p className='text-sm  text-gray-300 mt-1'>
                                                <h2>{item.text} </h2>  

                                            </p>
                                            <p className='text-sm  text-gray-300 mt-1'>
                                                <h4>{item.name} </h4>  

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
            : <div>{role} {user_name}</div>}
        </div>
    )
}

export default NewArtistsFollow;

