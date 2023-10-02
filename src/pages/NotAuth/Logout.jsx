import React from "react";
//import { redirectTo } from "react-router-dom";
import { useNavigate } from "react-router-dom";
import { useDispatch } from 'react-redux';
import { resetMusicState } from "../../redux/features/playerSlice";
import { RiEmotionSadLine } from "react-icons/ri";

const Logout = () => {
    const role = localStorage.getItem("role")
    const navigate = useNavigate();
    const dispatch = useDispatch();


    const handleClick = () => {
        localStorage.removeItem("email");
        localStorage.removeItem("role");
        localStorage.removeItem("id");
        localStorage.removeItem("name");
        localStorage.removeItem("username");
        localStorage.removeItem("img");

        dispatch(resetMusicState());
        navigate("/");
    }

    const handleClickBack = () => {
        if (role === "Admin"){
            navigate("/adminPage");
        }
        else if(role=== "User"){
            navigate("/Discover");

        }
        else{
            navigate("/homepageComposer");

        }
    }

    return (

        <div class="h-screen bg-transparent flex items-center justify-center">
            <div class="p-4 mb-8 sm:p-10 bg-white rounded-md  w-[300px] md:w-[500px] text-center overflow-y-auto">
                <span class="mb-4 inline-flex justify-center items-center w-[62px] h-[62px] rounded-full text-sm text-gray-400 hover:text-
                        cyan 400">
                    <RiEmotionSadLine className="w-9 h-9 mr-2" />
                </span>

                <h3 class="mb-2 text-2xl font-bold text-gray-800">
                    Sign out
                </h3>
                <p class="text-gray-500">
                    Are you sure you would like to sign out of your account?
                </p>

                <div class="mt-6 flex justify-center gap-x-4">

                    <button onClick={handleClick} type="button1" class="py-2.5 px-4 inline-flex justify-center items-center gap-2 rounded-md border border-transparent font-semibold bg-purple-400 text-white hover:bg-purple-600 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 transition-all text-sm">
                        Sign out
                    </button>
                    <button onClick={handleClickBack} type="button2" class="py-2.5 px-4 inline-flex justify-center items-center gap-2 rounded-md border border-transparent font-semibold bg-purple-400 text-white hover:bg-purple-600 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 transition-all text-sm">
                        Cancel
                    </button>
                </div>
            </div>
        </div>

    );
};
export default Logout;