import { Error, Loader } from "../../components";

import { useGetSongsByGenreQuery } from "../../redux/services/shazamCore";
import { useNavigate } from "react-router-dom";
import { useLocation } from 'react-router-dom';
import axios from 'axios';
import {HiThumbUp, HiThumbDown, HiHeart, HiOutlineHeart } from 'react-icons/hi';



const FirstFavorites = () => {
    const { data, isFetching, error } = useGetSongsByGenreQuery
        ('POP ');
    const navigate = useNavigate();
    const location = useLocation();
    const user_id = location.state.value;
    const show = true;

    if (isFetching) return <Loader title="Loading songs..." />;

    if (error) return <Error />

    const postData = (object) => {
        const favorites = { name: object.title, song_key: object.key, name_composer: object.subtitle, img: object.images.background, user: user_id };
        axios.post(`http://localhost:3002/favorites/addFavorites`, favorites);
        console.log(object.title)
    }

    function postNext() {
        navigate('/user-lr');
    }


    return (
        <div>
            <div className="flex flex-col">
                <div className="w-full flex items-center sm:flex-row flex-col mt-4 mb-10 ml-12">
                    <h2 className="font-bold text-lg text-white text-center">
                        Choose your favorites 
                    </h2>
                </div>
                <div>
                    <button onClick={postNext} class="py-2.5 px-4 w-24 h-9 ml-12 inline-flex justify-center items-center rounded-md border 
                            border-transparent font-semibold bg-purple-400 text-white hover:bg-purple-600 focus:outline-none 
                            focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 transition-all text-sm">Next</button>
                </div>
                <br></br>
                <div className="flex flex-wrap sm:justify-start
                            justify-center gap-8">
                            {data?.map((item) => (
                                <div className="flex flex-wrap sm:justify-start
                                justify-center gap-8">                               
                                    
                                    <div className='flex flex-col w-[210px] p-4 bg-white/5 bg-opacity-80 backdrop-blur-sm 
                                                                        animate-slideup rounded-lg cursor-pointer'>
                                        <div className="relative w-full h-50 group">
                                                
                                        <img src={item?.images?.coverart} alt={item?.title} />
                                        </div>
                                            <p className="font-semibold text-lg text-white truncate">
                                                {item.title}
                                            </p>
                                            <div className="flex justify-between">
                                            <p className='text-sm truncate text-gray-300 mt-1'>
                                                {item.subtitle}

                                            </p>
                                            
                                            <p className="font-semibold text-lg text-white truncate">
                                                <HiOutlineHeart onClick={() =>postData(item)} className="btn btn-primary w-6 h-6 mr-2" />
                                            </p>
                                            </div>
                                </div>
                                </div>
                            ))}
                        </div>
                    </div>
                </div>
    )
}

export default FirstFavorites;

