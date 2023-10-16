import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import axios from 'axios';

const Login = () => {
  const navigate = useNavigate();
  const [data, setData] = useState({
    email: "",
    password: "",
  });

  const [error, setError] = useState("");

  const handleChange = ({ currentTarget: input }) => {
    setData({ ...data, [input.name]: input.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const url = `${process.env.REACT_APP_SERVER_PATH}/api/auth`;
      const { data: res } = await axios.post(url, data);

      localStorage.setItem("token", res.data);
      localStorage.setItem("userId", res.userId);
      const storedProblemNo = localStorage.getItem('redirectProblemNo');
      if (storedProblemNo) {
        navigate(`/problem/${storedProblemNo}`);
        localStorage.removeItem('redirectProblemNo');
      } else {
        navigate("/");
      }
    } catch (error) {
      if (
        error.response &&
        error.response.status >= 400 &&
        error.response.status <= 500
      ) {
        setError(error.response.data.message);
      }
    }
  };

  return (
    <div className="min-h-screen bg-gray-100 flex items-center justify-center">
      <div className="w-full sm:w-96 md:w-96 lg:w-3/4 xl:w-4/5 h-auto flex flex-col md:flex-row rounded-lg shadow-lg bg-white">
        <div className="flex-1 p-6">
          <form onSubmit={handleSubmit} className="space-y-4">
            <div className="flex justify-between items-center">
              <h1 className="text-3xl font-semibold">Login to your Account</h1>
            </div>
            <div className="space-y-2">
              <input
                type="email"
                placeholder="Email"
                name="email"
                onChange={handleChange}
                value={data.email}
                required
                className="w-full p-4 rounded-lg bg-gray-200 focus:outline-none focus:ring focus:border-blue-300"
              />
              <input
                type="password"
                placeholder="Password"
                name="password"
                onChange={handleChange}
                value={data.password}
                required
                className="w-full p-4 rounded-lg bg-gray-200 focus:outline-none focus:ring focus:border-blue-300"
              />
            </div>
            {error && (
              <div className="p-4 rounded-lg bg-red-500 text-white text-center">
                {error}
              </div>
            )}
            <button type="submit" className="bg-blue-500 text-white px-4 py-2 rounded-lg hover:bg-blue-600 focus:outline-none focus:ring focus:ring-blue-300">
              Sign In
            </button>
          </form>
        </div>
        <div className="flex-1 p-6 bg-black text-white flex flex-col items-center justify-center">
          <h1 className="text-3xl font-semibold text-center mb-4">New Here?</h1>
          <Link to="/signup">
            <button type="button" className="bg-white text-black px-4 py-2 rounded-lg hover:bg-gray-200 focus:outline-none focus:ring focus:ring-gray-300">
              Sign Up
            </button>
          </Link>
        </div>
      </div>
    </div>
  );
};

export default Login;
