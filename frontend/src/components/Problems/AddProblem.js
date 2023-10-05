import React, { useState, useEffect } from 'react';
import axios from 'axios';

const AddProblemForm = () => {
  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');
  const [testCases, setTestCases] = useState('');
  const [level, setLevel] = useState('');
  const [error, setError] = useState(null);
  const [success, setSuccess] = useState(false);
  const [problemNo, setProblemNo] = useState(null);

  // Function to fetch the problem number
  const fetchProblemNumber = async () => {
    try {
      const response = await axios.get('http://localhost:8080/api/problems');
      setProblemNo(response.data.nextProblemNo);
    } catch (error) {
      console.error('Error fetching next problem number:', error);
      setError('Error fetching next problem number');
    }
  };

  // Function to handle form submission
  const handleAddProblem = async () => {
    try {
      const formData = {
        title,
        description,
        testCases,
        level,
        creator: localStorage.getItem('userId'),
      };

      const response = await axios.post('http://localhost:8080/api/problems', formData);

      if (response.status === 201) {
        console.log('Data sent successfully');
        setSuccess(true);

        // Fetch the updated problem number after adding a problem
        fetchProblemNumber();

        // Clear the form fields and reset the component state
        setTitle('');
        setDescription('');
        setTestCases('');
        setLevel('');
      } else {
        setError('Error sending data to the server');
      }
    } catch (err) {
      console.error(err);
      setError('Error sending data to the server');
    }
  };

  // Fetch the problem number when the component is first rendered
  useEffect(() => {
    fetchProblemNumber();
  }, []);

  return (
    <div className="w-full max-w-md mx-auto">
      <h2 className="text-2xl font-bold mb-4">Add New Problem</h2>
      <form className="bg-white shadow-md rounded px-8 pt-6 pb-8 mb-4">
        <div className="mb-4">
          <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="problemNo">
            Problem Number:
          </label>
          <input
            className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
            type="text"
            id="problemNo"
            value={problemNo || ''}
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
        {error && <p className="text-red-500">{error}</p>}
        {success && <p className="text-green-500">Problem added successfully!</p>}
      </form>
    </div>
  );
};

export default AddProblemForm;
