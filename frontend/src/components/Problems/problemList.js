import React, { useState } from 'react';
import axios from 'axios'; // Import axios for making API requests

const AddProblemForm = () => {
  const [problemNo, setProblemNo] = useState('');
  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');
  const [testCases, setTestCases] = useState('');
  const [level, setLevel] = useState('');
  const [error, setError] = useState(null); // State for handling errors
  const [success, setSuccess] = useState(false); // State for handling success message

  const handleAddProblem = async () => {
    try {
      const formData = {
        problemNo,
        title,
        description,
        testCases,
        level,
      };

      // Make a POST request to your server to submit the problem
      const response = await axios.post('http://localhost:8080/api/add-problems', formData);

      // Check the response status to see if it was successful
      if (response.status === 201) {
        // Handle success (e.g., show a success message)
        console.log('Data sent successfully');
        setError(null); // Clear any previous error message
        setSuccess(true); // Set success to true to show a success message
      } else {
        setError('Error sending data to the server');
      }
    } catch (err) {
      console.error(err);
      setError('Error sending data to the server');
    }
  };

  return (
    <div className="w-full max-w-md mx-auto">
      <h2 className="text-2xl font-bold mb-4">Add New Problem</h2>
      <form className="bg-white shadow-md rounded px-8 pt-6 pb-8 mb-4">
       {/* Input Fields */}
        <div className="mb-4">
          <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="problemNo">
            Problem Number:
          </label>
          <input
            className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
            type="text"
            id="problemNo"
            value={problemNo}
            onChange={(e) => setProblemNo(e.target.value)}
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
        <div className="mb-4">
          <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="testCases">
            Test Cases:
          </label>
          <textarea
            className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
            id="testCases"
            value={testCases}
            onChange={(e) => setTestCases(e.target.value)}
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
            <option value="easy">Easy</option>
            <option value="medium">Medium</option>
            <option value="hard">Hard</option>
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
        {error && <p className="text-red-500">{error}</p>} {/* Display error message */}
        {success && <p className="text-green-500">Problem added successfully!</p>} {/* Display success message */}
      </form>
    </div>
  );
};

export default AddProblemForm;
