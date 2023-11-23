import React, { useState, useEffect } from "react";
import axios from "axios";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const AddProblemForm = () => {
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  // const [testCases, setTestCases] = useState("");
  const [level, setLevel] = useState("");
  const [input, setInput] = useState("");
  const [output,setOutput] = useState("");
  const [problemNo, setProblemNo] = useState(null);

  // Function to fetch the problem number
  const fetchProblemNumber = async () => {
    try {
      const response = await axios.get(`${process.env.REACT_APP_SERVER_PATH}/api/problems`);
      setProblemNo(response.data.nextProblemNo);
    } catch (error) {
      toast.error("Error fetching the next problem number");
    }
  };

  useEffect(() => {
    fetchProblemNumber();
  }, [problemNo]);

  // Function to handle form submission
  const handleAddProblem = async () => {
    try {
      const formData = {
        title,
        description,
        input,
        output,
        level,
        creator: localStorage.getItem("userId"),
      };

      const response = await axios.post(
        `${process.env.REACT_APP_SERVER_PATH}/api/problems`,
        formData
      );

      if (response.status === 201) {
        // Fetch the updated problem number after adding a problem
        fetchProblemNumber();

        // Clear the form fields and reset the component state
        setTitle("");
        setDescription("");
       
        setInput("");
        setOutput("");
        setLevel("");

        toast.success("Problem added successfully!");
      }
    } catch (err) {
      toast.error("Some Field Missing: " + { err });
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-indigo-400">
      <div className=" bg-orange-200 rounded-lg shadow-lg p-4 max-w-md w-full sm:w-2/3 md:w-1/2 lg:w-1/3 overflow-y-auto">
        <h2 className="text-xl md:text-2xl lg:text-3xl font-bold mb-4">Add New Problem</h2>
        <form>
          <div className="mb-4">
            <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="problemNo">
              Problem Number:
            </label>
            <input
              className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
              type="text"
              id="problemNo"
              value={problemNo || ""}
              readOnly
            />
          </div>
          <div className="mb-4">
            <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="title">
              Title:
            </label>
            <input
              className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
              type="text"
              id="title"
              value={title}
              onChange={(e) => setTitle(e.target.value)}
            />
          </div>
          <div className="mb-4">
            <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="description">
              Description:
            </label>
            <textarea
              className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
              id="description"
              value={description}
              onChange={(e) => setDescription(e.target.value)}
            />
          </div>
          {/* <div className="mb-4">
            <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="testCases">
              Test Cases:
            </label>
            <textarea
              className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
              id="testCases"
              value={testCases}
              onChange={(e) => setTestCases(e.target.value)}
            />
          </div> */}
          <div className="mb-4">
            <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="input">
             Input:
            </label>
            <textarea
              className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
              id="input"
              value={input}
              onChange={(e) => setInput(e.target.value)}
            />
          </div>
          <div className="mb-4">
            <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="output">
              Output:
            </label>
            <textarea
              className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
              id="output"
              value={output}
              onChange={(e) => setOutput(e.target.value)}
            />
          </div>
          <div className="mb-4">
            <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="level">
              Difficulty:
            </label>
            <select
              className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
              id="level"
              value={level}
              onChange={(e) => setLevel(e.target.value)}
            >
              <option value="">Select Level</option>
              <option value="Easy">Easy</option>
              <option value="Medium">Medium</option>
              <option value="Hard">Hard</option>
            </select>
          </div>
          <div className="flex items-center justify-center">
            <button
              className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
              type="button"
              onClick={handleAddProblem}
            >
              Add Problem
            </button>
          </div>
        </form>
        <ToastContainer
          position="top-left"
          autoClose={3000}
          hideProgressBar={false}
          newestOnTop={false}
          closeOnClick
          rtl={false}
          pauseOnFocusLoss
          draggable
          pauseOnHover
          theme="dark"
        />
      </div>
    </div>
  );
};

export default AddProblemForm;
