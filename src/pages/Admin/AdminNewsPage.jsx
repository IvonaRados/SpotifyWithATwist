import { Link } from "react-router-dom";
import React, { useState, useEffect } from "react";

import axios from 'axios';
import { useNavigate } from "react-router-dom";
import Discover from "../User/Discover";
import { Pagination, Sidebar, Loader } from "../../components";
import { linksAdmin } from "../../assets/constants";
import { MdToggleOn, MdToggleOff } from "react-icons/md";
import Admin from "./AdminPage";


//Stranica samog izvodaca gdje vidi svoju stranicu



const AdminNews = () => {
    const navigate = useNavigate();
    const [name, setName] = useState("");
    //const [id, setId] = useState("");
    
    const admin_id = localStorage.getItem("id");
    const admin_name = localStorage.getItem("name");
    const admin_role = localStorage.getItem("role");
    console.log(admin_name, admin_id);
    const [isLoading, setIsLoading] = useState(true); // Add loading state
    

    const [artists, setArtists] = useState([]);
    const [news, setNews] = useState([]);

    const [currentPage, setCurrentPage] = useState(1);
    const [postPerPage, setPostPerPage] = useState(3);   
    const indexOfLastPost = currentPage * postPerPage;
    const indexOfFirstPost = indexOfLastPost - postPerPage;

    const paginate = (pageNumber) => setCurrentPage(pageNumber);

    const sortedNews = news.sort((b, a) => new Date(a.date) - new Date(b.date));
    const currentPosts=sortedNews.slice(indexOfFirstPost, indexOfLastPost);

    const [updateContent, setUpdateContent] = useState(false);

    const fetchData = () => {
        getNews();
        getArtists();
    }

    useEffect(() => {
        if (updateContent) {
            fetchData(); 
            setUpdateContent(false); 
        }
    }, [updateContent]);


    function getNews() {
        
        const response = fetch(
            'http://localhost:3002/composers/news'
        ).then((value) => value.json().then((news) => { setNews(news);     setIsLoading(false);
        }))
        console.log("NEWS", news);
    }
    
    useEffect(() => {
        getNews();
    }, []);


    

    function getArtists() {
        
        const response = fetch(
            'http://localhost:3002/composers/all'
        ).then((value) => value.json().then((artist) => { setArtists(artist);     setIsLoading(false);
        }))
        console.log("Artists: ", artists);
    }
    
    useEffect(() => {
        getArtists();
    }, []);



    const addData=(value)=>{
        const flag = "active";

        console.log(value);
        axios.put(`http://localhost:3002/editNews/${value}`, {flag})
                .then(response => {
                    console.log(response);
                })
                .catch(error => {
                    console.log(error);
                });

        setUpdateContent(true);
    }

    const removeData=(value)=>{
        const flag = "inactive";


        axios.put(`http://localhost:3002/editNews/${value}`, {flag})
                .then(response => {
                    console.log(response);
                })
                .catch(error => {
                    console.log(error);
                });

                setUpdateContent(true);
            }
   
    if (isLoading || !news || !artists) {
        return <Loader title="Loading..." />;
        }


    return (
        <div>
            {
                admin_role==="Admin" ?
                <div className="relative flex">
                    <Sidebar linkValue={linksAdmin}/>  
                    
                    <div className="flex flex-col">
                        <div className="w-full flex justify-between items-center sm:flex-row flex-col mt-4 mb-10">
                            <h1 className="font-bold text-3x1 text-white text-left">
                                Welcome Admin 
                            </h1>
                        </div>

                    <div>
                    <div className="flex flex-wrap sm:justify-start
                                justify-center mt-5">
                            {currentPosts?.map((item) => {
                                return item.flag!=null ? ( 

                                    <div className="flex flex-wrap sm:justify-start
                                justify-center  mt-5 ml-4 w-[400px]">

                                            <div className='flex flex-col p-4 bg-white/5 bg-opacity-80 backdrop-blur-sm 
                                                        animate-slideup rounded-lg cursor-pointer'>
                                    
                                        <div className=" flex flex-col">
                                        <p className="font-semibold text-lg text-white">
                                                {item.title_of_article} 
                                            

                                            </p>
                                            <p className='text-sm  text-gray-300 mt-1'>
                                                <h2>{item.text} </h2>  

                                            </p>
                                            <p className='text-sm  text-gray-300 mt-1'>
                                                <h4>{item.name} </h4>  

                                            </p>
                                            <div className="flex justify-between">
                                                <p className='text-sm truncate text-gray-300 mt-1'>
                                                    <h4>{item.date} </h4>  

                                                </p>
                                            
                                                
                                                    { item.flag==="inactive" ? 
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
                                    <br></br>
                                </div>
                        
                                            
                                ):(
                                    <p></p>
                                )
                                 
                         })}
                        </div>
                    </div>
                    <br></br>
                    <div>
                                        
                        <Pagination postPerPage={postPerPage} totalPosts={news.length} paginate={paginate} />
                                                                
                    </div>
                </div>
                </div>

            
        : <Discover/>}
        </div>
    )
}

export default AdminNews;

