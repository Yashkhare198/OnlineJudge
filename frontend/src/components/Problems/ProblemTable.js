import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import axios from 'axios';

const ProblemTable = () => {
  const [problems, setProblems] = useState([]);
  const [sortedProblems, setSortedProblems] = useState([]);
  const [sortBy, setSortBy] = useState('problemNo');
  const [sortOrder, setSortOrder] = useState('asc');

  useEffect(() => {
    // Fetch data from the server when the component mounts
    axios
      .get('http://localhost:8080/api/problems')
      .then((response) => {
        setProblems(response.data.problems);
      })
      .catch((error) => {
        console.error('Error fetching data:', error);
      });
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

  return (
    <div className="max-w-screen-lg mx-auto p-6">
      <h2 className="text-2xl font-bold mb-4">Problem Table</h2>
      <table className="min-w-full divide-y divide-gray-200">
        <thead>
          <tr>
            <th
              className="px-6 py-3 bg-gray-50 text-left text-xs leading-4 font-medium text-gray-500 uppercase tracking-wider cursor-pointer"
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
              className="px-6 py-3 bg-gray-50 text-left text-xs leading-4 font-medium text-gray-500 uppercase tracking-wider cursor-pointer"
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
              className="px-6 py-3 bg-gray-50 text-left text-xs leading-4 font-medium text-gray-500 uppercase tracking-wider cursor-pointer"
              onClick={() => handleSort('level')}
            >
              Difficulty
              {sortBy === 'level' && (
                <span className="ml-1">
                  {sortOrder === 'asc' ? '▲' : '▼'}
                </span>
              )}
            </th>
            <th className="px-6 py-3 bg-gray-50 text-left text-xs leading-4 font-medium text-gray-500 uppercase tracking-wider">
              Actions
            </th>
          </tr>
        </thead>
        <tbody className="bg-white divide-y divide-gray-200">
          {sortedProblems.map((problem) => (
            <tr key={problem._id}>
              <td className="px-6 py-4 whitespace-no-wrap">
                <Link to={`/problem/${problem.problemNo}`}>{problem.problemNo}</Link>
              </td>
              <td className="px-6 py-4 whitespace-no-wrap">{problem.title}</td>
              <td className="px-6 py-4 whitespace-no-wrap">{problem.level}</td>
              <td className="px-6 py-4 whitespace-no-wrap">
                {problem.creator === localStorage.getItem("userId") && (
                  <Link to={`/edit/problem/${problem.problemNo}`} className="text-blue-600 hover:underline">
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
