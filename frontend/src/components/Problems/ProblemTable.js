import React, { useState, useEffect } from 'react';
import axios from 'axios';

const ProblemTable = () => {
  const [problems, setProblems] = useState([]); //tracks fetched problem
  const [sortBy, setSortBy] = useState('problemNo'); //tracks column
  const [sortOrder, setSortOrder] = useState('asc'); //tracks the sorting order

  useEffect(() => {
    // Fetch data from the server when component is rendered
    axios
      .get(`http://localhost:8080/api/get-problems`)
      .then((response) => {
        const sortedProblems = response.data.sort((a, b) => {
          if (sortOrder === 'asc') {
            return a[sortBy].localeCompare(b[sortBy]);
          } else {
            return b[sortBy].localeCompare(a[sortBy]);
          }
        });
        setProblems(sortedProblems);
      })
      .catch((error) => {
        console.error('Error fetching data:', error);
      });
  }, [sortBy, sortOrder]);

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
          </tr>
        </thead>
        <tbody className="bg-white divide-y divide-gray-200">
          {problems.map((problem) => (
            <tr key={problem._id}>
              <td className="px-6 py-4 whitespace-no-wrap">{problem.problemNo}</td>
              <td className="px-6 py-4 whitespace-no-wrap">{problem.title}</td>
              <td className="px-6 py-4 whitespace-no-wrap">{problem.level}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default ProblemTable;
