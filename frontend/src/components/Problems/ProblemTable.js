import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import axios from 'axios';

const ProblemTable = () => {
  const user = localStorage.getItem("userId");
  const [problems, setProblems] = useState([]);
  const [sortedProblems, setSortedProblems] = useState([]);
  const [sortBy, setSortBy] = useState('problemNo');
  const [sortOrder, setSortOrder] = useState('asc');

  useEffect(() => {
    // Fetch data from the server when the component mounts
    const fetchData = async () => {
      try {
        const response = await axios.get(`${process.env.REACT_APP_SERVER_PATH}/api/problems`);
        setProblems(response.data.problems);
      } catch (error) {
        console.error('Error fetching data:', error);
      }
    };

    fetchData();
  }, []); // The empty dependency array ensures this effect runs only once

  useEffect(() => {
    if (problems.length > 0) {
      // Your sorting logic here
      const sortedData = [...problems];
      // Sort the sortedData based on sortBy and sortOrder
      if (sortBy === 'problemNo') {
        sortedData.sort((a, b) => {
          if (sortOrder === 'asc') {
            return a.problemNo - b.problemNo;
          } else {
            return b.problemNo - a.problemNo;
          }
        });
      } else if (sortBy === 'title') {
        sortedData.sort((a, b) => {
          if (sortOrder === 'asc') {
            return a.title.localeCompare(b.title);
          } else {
            return b.title.localeCompare(a.title);
          }
        });
      } else if (sortBy === 'level') {
        sortedData.sort((a, b) => {
          if (sortOrder === 'asc') {
            return a.level.localeCompare(b.level);
          } else {
            return b.level.localeCompare(a.level);
          }
        });
      }
      setSortedProblems(sortedData);
    }
  }, [problems, sortBy, sortOrder]);

  const handleSort = (column) => {
    if (sortBy === column) {
      setSortOrder(sortOrder === 'asc' ? 'desc' : 'asc');
    } else {
      setSortBy(column);
      setSortOrder('asc');
    }
  };

  if (problems.length === 0) {
    return (
      <div className="max-w-screen-lg mx-auto p-6">
        <div className="bg-white py-8 px-10 rounded-lg shadow-lg text-center">
          <h2 className="text-2xl font-bold mb-4 text-indigo-800">
            Loading...
          </h2>
        </div>
      </div>
    );
  }

  return (
    <div className="max-w-screen-lg mx-auto p-6">
      <h2 className="text-3xl font-extrabold mb-4 text-indigo-800">Problem Table</h2>
      <table className="min-w-full divide-y divide-gray-300">
        <thead>
          <tr>
            <th
              className="px-6 py-3 bg-gray-100 text-left text-xs leading-4 font-semibold text-indigo-700 uppercase cursor-pointer"
              onClick={() => handleSort('problemNo')}
            >
              Problem No.
              {sortBy === 'problemNo' && (
                <span className="ml-1">
                  {sortOrder === 'asc' ? '▲' : '▼'}
                </span>
              )}
            </th>
            <th
              className="px-6 py-3 bg-gray-100 text-left text-xs leading-4 font-semibold text-indigo-700 uppercase cursor-pointer"
              onClick={() => handleSort('title')}
            >
              Title
              {sortBy === 'title' && (
                <span className="ml-1">
                  {sortOrder === 'asc' ? '▲' : '▼'}
                </span>
              )}
            </th>
            <th
              className="px-6 py-3 bg-gray-100 text-left text-xs leading-4 font-semibold text-indigo-700 uppercase cursor-pointer"
              onClick={() => handleSort('level')}
            >
              Difficulty
              {sortBy === 'level' && (
                <span className="ml-1">
                  {sortOrder === 'asc' ? '▲' : '▼'}
                </span>
              )}
            </th>
            <th className="px-6 py-3 bg-gray-100 text-left text-xs leading-4 font-semibold text-indigo-700 uppercase">
              Actions
            </th>
          </tr>
        </thead>
        <tbody className="bg-white divide-y divide-gray-300">
          {sortedProblems.map((problem) => (
            <tr key={problem._id}>
              <td className="px-6 py-4 whitespace-no-wrap">
                <Link to={`/problem/${problem.problemNo}`} className="text-indigo-600 hover:underline">
                  {problem.problemNo}
                </Link>
              </td>
              <td className="px-6 py-4 whitespace-no-wrap">{problem.title}</td>
              <td className="px-6 py-4 whitespace-no-wrap">{problem.level}</td>
              <td className="px-6 py-4 whitespace-no-wrap">
                {problem.creator === user && (
                  <Link to={`/edit/problem/${problem.problemNo}`} className="text-indigo-600 hover:underline">
                    Edit
                  </Link>
                )}
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default ProblemTable;
