import { useState } from "react";
import { Sidebar } from "../../components";
import React from "react";
import { useGetTopChartsQuery } from "../../redux/services/shazamCore";
import { linksLoginRegister } from "../../assets/constants";
import { NavLink } from "react-router-dom";

const Homepage = () => {    
    const {data} = useGetTopChartsQuery();
    const topPlays =data?.slice(0,20);
    console.log(topPlays);

    return (
        <div className="relative flex">

        <div className="md:flex hidden flex-col w-[600px]
            py-10 px-2 bg-[#191624]">
                <div className="mt-10">
                    {linksLoginRegister.map((item) => (
                    <NavLink
                        key={item.name}
                        to={item.to}
                        className="flex flex-row justify-start items-center
                        my-8 ml-12 text-sm font-medium text-gray-400 hover:text-
                        cyan 400"
                        onClick={() => handleClick}
                    >
                        <item.icon className="w-6 h-6 mr-2" />
                        {item.name}
                    </NavLink>

                    ))}
                </div>

        </div>
        <div className="flex flex-col">
                <div className="w-full flex justify-between items-center sm:flex-row flex-col mt-4 mb-10">
                    
                </div>
                <div className="flex flex-wrap sm:justify-start
                    justify-center gap-8 ml-28">
                                { topPlays?.map((song, i) => (
                                    <div className='flex flex-col w-[200px] p-4
                                    bg-white/5 bg-opacity-80 backdrop-blur-sm 
                                    animate-slideup rounded-lg cursor-pointer'>
                                            <div className="relative w-full h-50 group">
                                                <img src={song?.images?.coverart} alt={song?.title}  />
                                            </div>
                                            <div className="mt-4 flex flex-col">  
                                                <p className="font-semibold text-lg text-white truncate">
                                                    {song?.title}
                                                </p>
                                                <p className='text-sm truncate text-gray-300 mt-1'>
                                                    {song?.subtitle}
                                                </p>   
                                            </div>
                                    </div>
                                ))}
                </div>
            </div>
        </div>
    )
    
}

export default Homepage;

