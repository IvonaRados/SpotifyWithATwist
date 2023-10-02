import React, { useState } from "react";
import { Link } from "react-router-dom";
import axios from 'axios';
import { useNavigate } from "react-router-dom";
import { Sidebar } from "../../components";
import { linksLoginRegister } from "../../assets/constants";
import { HiUser, HiMicrophone, HiOutlineUser } from 'react-icons/hi';
import { RiAdminFill } from "react-icons/ri";
import { NavLink } from "react-router-dom";

const UserLoginRegister = () => {
    const navigate = useNavigate();
    const [email, setEmail] = useState("");
    const [role, setRole] = useState("");
    const [password, setPassword] = useState("");
    const [id, setId] = useState("");

    function postData(e) {
        e.preventDefault();
        const user = {
            email: email,
            password: password,
            id: id,
            role: role
        };
        console.log(user);
        axios.post('http://localhost:3002/login', user).then(data => {
            console.log(data);
            if (data.data.email) {
                localStorage.setItem("role", data.data.role);
                localStorage.setItem("email", data.data.email);
                localStorage.setItem("id", data.data.id);
                localStorage.setItem("username", data.data.username);
                localStorage.setItem("img", data.data.img);

                console.log(user);
                console.log(data.data.id);
                navigate("/Discover");
            } else {
                console.log("Authentication error");
            }
        })
            .catch(error => {
                console.log(error);
            });
    }



    return (
        <div className="relative flex ml-12">
            <div className="flex flex-col items-center justify-center min-h-screen">
                <div className="w-full p-6 m-auto bg-transparent  lg:max-w-xl mt-10 ml-96">
                    <h1 className="text-3xl font-semibold text-center text-white ">
                        Sign in
                    </h1>
                    <form className="mt-6">
                        <div className="mb-2">
                            <input type="email" className="block w-full px-4 py-2 mt-2 text-black bg-white border rounded-md focus:border-purple-400 focus:ring-purple-300 focus:outline-none focus:ring focus:ring-opacity-40"
                                id="email" aria-describedby="emailHelp" placeholder="Enter email" onChange={(e) => setEmail(e.target.value)} 
                            />
                        </div>
                        <div className="mb-2">
                            <input type="password" className="block w-full px-4 py-2 mt-2 text-black bg-white border rounded-md focus:border-purple-400 focus:ring-purple-300 focus:outline-none focus:ring focus:ring-opacity-40"
                                id="password" placeholder="Password" onChange={(e) => setPassword(e.target.value)}
                            />
                        </div>

                        <div className="mt-6">
                            <button onClick={postData} className="w-full px-4 py-2 tracking-wide text-white transition-colors duration-200 transform bg-purple-500 rounded-md hover:bg-purple-600 focus:outline-none focus:bg-purple-600">
                                Login
                            </button>
                        </div>
                    </form>

                    <div className="relative flex items-center justify-center w-full mt-6 border border-t">

                    </div>
                    <div className="flex mt-4 gap-x-2">
                        <button type="button" className="flex items-center justify-center w-full p-2 border rounded-md text-sm font-medium text-gray-400 hover:text-
                        cyan 400"
                        >
                            <NavLink key='User' to='/user-lr'>
                                <HiUser className="w-6 h-6 mr-2" />
                            </NavLink>
                        </button>
                        <button className="flex items-center justify-center w-full p-2 border rounded-md text-sm font-medium text-gray-400 hover:text-
                        cyan 400">
                            <NavLink key='Artist' to='/composer-lr'>
                                <HiMicrophone className="w-6 h-6 mr-2" />
                            </NavLink>
                        </button>
                        <button className="flex items-center justify-center w-full p-2 border rounded-md text-sm font-medium text-gray-400 hover:text-
                        cyan 400">
                            <NavLink key='Artist' to='/composer-lr'>
                                <RiAdminFill className="w-6 h-6 mr-2" />
                            </NavLink>
                        </button>
                    </div>

                    <p className="mt-8 text-xs font-light text-center text-gray-700">
                        
                        <Link className="font-medium text-white hover:underline" to={`/user-register`}>
                            <p>New here? Registre here! </p>
                        </Link>
                    </p>
                </div>
            </div>
        </div>
    )
}

export default UserLoginRegister;

