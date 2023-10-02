import React, { useState } from "react";
import { Link } from "react-router-dom";
import axios from 'axios';
import { useNavigate } from "react-router-dom";
import { Sidebar } from "../../components";
import { linksAdmin, linksArtist } from "../../assets/constants";



const AddNewNews = () => {
    const navigate = useNavigate();
    const [title, setTitle] = useState("");
    const [text, setText] = useState("");
    const current_user_id = localStorage.getItem("id");
    const composer_name = localStorage.getItem("name");
    const img = localStorage.getItem("img");



    function postData(e){
        e.preventDefault();
        var newDate = new Date();
        const stringDate =newDate.toString();
        console.log(stringDate);
        var cutStringDate = stringDate.slice(0, 10);

        const year = newDate.getFullYear(); // Full year (e.g., 2023)
        const month = newDate.getMonth();   // Month index (0-11)
        const day = newDate.getDate();      // Day of the month (1-31)
        const month1= month+1;

        const date=year+"-"+ month1 +"-"+ day;
        console.log("final date", date);

        const news = { title_of_article: title,
            text: text,
            composer: current_user_id,
            date:date,
            name: composer_name,
            flag: "inactive"};
        console.log(news);
        axios.post(`http://localhost:3002/composer/addNews`, news);
        navigate("/homepageComposer");

    }
    



    return (
        

<div className="relative flex">
            <Sidebar linkValue={linksArtist} username={composer_name} img={img}/>
            <div className="flex flex-col items-center justify-center min-h-screen">
                <div className="w-full p-6 m-auto bg-transparent  lg:max-w-xl mt-10 ml-56">
                    <h1 className="text-2xl font-semibold text-center text-white ">
                        Your new news
                    </h1>
                    <form className="mt-6">
                        <div className="mb-2">
                            <input type="title" className="block w-full px-4 py-2 mt-2 text-black bg-white border rounded-md focus:border-purple-400 focus:ring-purple-300 focus:outline-none focus:ring focus:ring-opacity-40"
                                id="title" aria-describedby="titleHelp" placeholder="Enter the title"
                                onChange={(e) => setTitle(e.target.value)}
                            />
                        </div>
                        <div className="mb-2">
                            <textarea type="text" className="block w-full px-4 py-3 mt-2 text-black bg-white border resize-y rounded-md focus:border-purple-400 focus:ring-purple-300 focus:outline-none focus:ring focus:ring-opacity-40"
                                id="text" aria-describedby="textHelp" placeholder="Enter your news"
                                onChange={(e) => setText(e.target.value)}
                            />
                        </div>

                        <div className="mt-6">
                            <button onClick={postData} className="w-full px-4 py-2 tracking-wide text-black transition-colors duration-200 transform bg-gray-500 rounded-md hover:bg-gray-600 focus:outline-none">
                                Add
                            </button>
                        </div>
                    </form>

                
                </div>
        </div>
        </div>

    )
}

export default AddNewNews;

