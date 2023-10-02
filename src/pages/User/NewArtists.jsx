import { Link } from "react-router-dom";
import React, { useState, useEffect } from "react";
import axios from 'axios';
import { useNavigate } from "react-router-dom";
import { Sidebar, Loader } from "../../components";
import { linksUser } from "../../assets/constants";
import { HiUserAdd, HiUserRemove } from "react-icons/hi";

//USer vidi sve nove izvodace. Omoguciti pracenje

//napravi get user by id gdje pristupamo atributu composer follow i dodajemo id novog composera

const NewArtists = () => {
    const navigate = useNavigate();
    const [name, setName] = useState("");
    //const [id, setId] = useState("");
    
    const user_id = localStorage.getItem("id");
    const user_name = localStorage.getItem("username");
    const role = localStorage.getItem("role");
    const img = localStorage.getItem("img");

    console.log(role, user_name);
    const [favorites, setFavorites] = useState([]);
    const [isLoading, setIsLoading] = useState(true); // Add loading state
    


    const [artists, setArtists] = useState([]);
    const [user, setUser] = useState(null);
    const [artist, setArtist] = useState([]);
    
    const [updateContent, setUpdateContent] = useState(false);

    const fetchData = () => {
        getUser();
        getArtists();
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
        console.log("User: ", user);
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



    function postData(value){
        //e.preventDefault();
        
        var edit_playlist=user.new_composers_follow;
        const composer= {}
        composer._id = value;
        edit_playlist.push(composer);

        axios.put(`http://localhost:3002/user/editUser/${user._id}`, edit_playlist)
                .then(response => {
                    console.log(response);
                })
                .catch(error => {
                    console.log(error);
                });
        setUpdateContent(true); 
      }

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
      if (isLoading || !user) {
        return <Loader title="Loading..." />;
      }

    return (
        <div>
            {
                role==="User" && user!=undefined ?
                <div className="relative flex">
                    <Sidebar linkValue={linksUser} username={user_name} img={img}/>
                    <div className="flex flex-col">
                            <div className="flex flex-wrap sm:justify-start
                                justify-center">
                                    
                                    
                                {artists.map((item) => {
                                    return role==="User" && item.flag==="active" ? ( 
                                    
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
                                                    <div>
                                                {    user.new_composers_follow.some(composer => composer._id === item._id) ?

                                                        <p className="font-semibold text-lg text-white truncate">
                                                        <HiUserRemove onClick={() => deleteData(item._id)} className="btn btn-primary w-6 h-6 mt-2" />

                                                        </p>
                                                    : 
                                                    <p className="font-semibold text-lg text-white truncate ">
                                                        <HiUserAdd onClick={() => postData(item._id)} className="btn btn-primary w-6 h-6 mt-2" />

                                                    </p>

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
            
        : <div>{role} {user_name}</div>}
        </div>
    )
}

export default NewArtists;

