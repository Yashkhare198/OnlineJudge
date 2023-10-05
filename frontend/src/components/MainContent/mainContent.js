import React from 'react';
import { Link, useNavigate } from 'react-router-dom';

const MainContent = () => {
    const navigate = useNavigate();
    const user = localStorage.getItem("token");

    const handleLogout = () => {
        localStorage.removeItem("token");
        localStorage.removeItem("userId");
        localStorage.removeItem('redirectProblemNo');
        navigate("/"); // Navigate to the homepage or any other suitable page
    }

    return (
        <div className="bg-gray-900 text-white">
            <nav className="container mx-auto py-4 flex justify-between items-center">
                <h1 className="text-3xl font-semibold">CodeHub</h1>
                <div className="space-x-4 md:space-x-8">
                    <Link to="/" className="text-white hover:text-gray-400">Home</Link>
                    <Link to="/problem-table" className="text-white hover:text-gray-400">Problems</Link>
                    {user ? (
                        <Link to="/add-problem" className="text-white hover:text-gray-400">
                            Add-Problem
                        </Link>
                    ) : (
                        <Link to="/login" className="text-white hover:text-gray-400">
                            Add-Problem
                        </Link>
                    )}
                    <Link to="/about" className="text-white hover:text-gray-400">About</Link>
                </div>
                {user ? (
                    <button className="bg-red-600 text-white px-4 py-2 rounded hover:bg-red-700" onClick={handleLogout}>
                        Logout
                    </button>
                ) : (
                    <Link to="/login" className="bg-green-600 text-white px-4 py-2 rounded hover:bg-red-700">
                        Login
                    </Link>
                )}
            </nav>
        </div>
    );
};

export default MainContent;
