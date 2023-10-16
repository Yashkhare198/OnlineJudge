import React from 'react';
import { Link, useNavigate, useLocation } from 'react-router-dom';

const MainContent = () => {
    const navigate = useNavigate();
    const user = localStorage.getItem("userId");
    const location = useLocation();

    const handleLogout = () => {
        localStorage.removeItem("token");
        localStorage.removeItem("userId");
        localStorage.removeItem('redirectProblemNo');
        navigate("/"); // Navigate to the homepage or any other suitable page
    }

    return (
        <div className="bg-gray-900 text-white">
            <nav className="container mx-auto py-4 flex flex-col md:flex-row md:justify-between md:items-center">
                <h1 className="text-3xl font-semibold text-center md:text-left">CodeHub</h1>
                <div className="space-y-2 md:space-x-4 md:space-y-0 flex flex-col md:flex-row md:items-center">
                    <NavLink to="/" active={location.pathname === '/'}>Home</NavLink>
                    <NavLink to="/problem-table" active={location.pathname === '/problem-table'}>Problems</NavLink>
                    {user ? (
                        <NavLink to="/add-problem" active={location.pathname === '/add-problem'}>
                            Add Problem
                        </NavLink>
                    ) : (
                        <NavLink to="/login" >
                            Add Problem
                        </NavLink>
                    )}
                    <NavLink to="/about" active={location.pathname === '/about'}>About</NavLink>
                </div>
                {user ? (
                    <button className="bg-red-600 text-white px-4 py-2 rounded hover:bg-red-700 mt-2 md:mt-0" onClick={handleLogout}>
                        Logout
                    </button>
                ) : (
                    <button className="bg-green-600 text-white px-4 py-2 rounded hover:bg-white mt-2 md:mt-0" >
                    <NavLink to="/login"  className="bg-green-600 text-white px-4 py-2 rounded hover:bg-red-700 mt-2 md:mt-0">
                        Login
                    </NavLink>
                    </button>
                )}
            </nav>
        </div>
    );
};

const NavLink = ({ to, active, children }) => (
    <Link to={to} className={`text-white hover:text-yellow-400 ${active ? 'bg-violet-600' : ''} px-4 py-2 rounded`}>
        {children}
    </Link>
);

export default MainContent;
