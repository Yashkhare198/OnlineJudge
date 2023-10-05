import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import Login from '../Login';

const Main = () => {
    const user = localStorage.getItem("userId");
    const [dynamicText, setDynamicText] = useState("Sharpen your coding skills!");

    useEffect(() => {
        // Implement a dynamic text change after a delay
        const textChangeInterval = setInterval(() => {
            setDynamicText("Solve challenges, compete, and excel!");
        }, 2000);

        return () => {
            clearInterval(textChangeInterval); // Clean up the interval on unmount
        };
    }, []);

    return (
        <div className="bg-gradient-to-br from-blue-300 to-blue-500 h-screen flex items-center">
            <div className="container mx-auto text-center text-white">
                <div className="mb-8">
                    <h1 className="text-6xl font-extrabold">Welcome to CodeHub</h1>
                    <p className="text-2xl text-gray-300 mt-2">Your Ultimate Coding Challenge Platform</p>
                </div>

                {user ? (
                    <div>
                        <p className="text-xl text-gray-300 my-4">{dynamicText}</p>
                        <Link to="/problem-table" className="bg-blue-500 hover:bg-blue-600 text-white py-3 px-8 rounded-full inline-block font-semibold text-lg">
                            Explore Problems
                        </Link>
                    </div>
                ) : (
                    <div>
                        <Login />
                    </div>
                )}
            </div>
        </div>
    );
};

export default Main;
