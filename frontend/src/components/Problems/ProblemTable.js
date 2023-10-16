import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import axios from "axios";

const ProblemTable = () => {
  const user = localStorage.getItem("userId");
  const [problems, setProblems] = useState([]);
  const [sortedProblems, setSortedProblems] = useState([]);
  const [sortBy, setSortBy] = useState("problemNo");
  const [sortOrder, setSortOrder] = useState("asc");
  const [selectedDifficulty, setSelectedDifficulty] = useState("All");

  useEffect(() => {
    // Fetch data from the server when the component mounts
    const fetchData = async () => {
      try {
        const response = await axios.get(
          `${process.env.REACT_APP_SERVER_PATH}/api/problems`
        );
        setProblems(response.data.problems);
      } catch (error) {
        console.error("Error fetching data:", error);
      }
    };

    fetchData();
  }, []); // The empty dependency array ensures this effect runs only once

  useEffect(() => {
    if (problems.length > 0) {
      // Your sorting logic here
      const sortedData = [...problems];
      // Sort the sortedData based on sortBy and sortOrder
      if (sortBy === "problemNo") {
        sortedData.sort((a, b) => {
          if (sortOrder === "asc") {
            return a.problemNo - b.problemNo;
          } else {
            return b.problemNo - a.problemNo;
          }
        });
      } else if (sortBy === "title") {
        sortedData.sort((a, b) => {
          if (sortOrder === "asc") {
            return a.title.localeCompare(b.title);
          } else {
            return b.title.localeCompare(a.title);
          }
        });
      } else if (sortBy === "level") {
        sortedData.sort((a, b) => {
          if (sortOrder === "asc") {
            return a.level.localeCompare(b.level);
          } else {
            return b.level.localeCompare(a.level);
          }
        });
      }

      // Apply difficulty filtering
      if (selectedDifficulty !== "All") {
        const filteredData = sortedData.filter(
          (problem) => problem.level === selectedDifficulty
        );
        setSortedProblems(filteredData);
      } else {
        setSortedProblems(sortedData);
      }
    }
  }, [problems, sortBy, sortOrder, selectedDifficulty]);

  const handleSort = (column) => {
    if (sortBy === column) {
      setSortOrder(sortOrder === "asc" ? "desc" : "asc");
    } else {
      setSortBy(column);
      setSortOrder("asc");
    }
  };

  // Function to set color based on the difficulty level
  const getDifficultyColor = (level) => {
    switch (level) {
      case "Easy":
        return "text-green-500";
      case "Medium":
        return "text-orange-500";
      case "Hard":
        return "text-red-500";
      default:
        return "text-gray-700";
    }
  };

  // Function to handle difficulty filter change
  const handleDifficultyFilterChange = (e) => {
    setSelectedDifficulty(e.target.value);
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
    <div className="bg-yellow-400 min-h-screen">
      <div
        className="max-w-screen-lg mx-auto p-6"
        style={{ minHeight: "calc(100vh - 16px)" }}
      >
        <h2 className="text-3xl font-extrabold mb-4 text-indigo-800">
          Problem Table
        </h2>

        <div className="mb-4">
          <label
            htmlFor="difficultyFilter"
            className="text-indigo-700 font-semibold"
          >
            Filter by Difficulty:
          </label>
          <select
            id="difficultyFilter"
            className="ml-2 px-4 py-2 border rounded-md"
            value={selectedDifficulty}
            onChange={handleDifficultyFilterChange}
          >
            <option value="All">All</option>
            <option value="Easy">Easy</option>
            <option value="Medium">Medium</option>
            <option value="Hard">Hard</option>
          </select>
        </div>

        <div className="overflow-x-auto">
          <table className="min-w-full">
            <thead>
              <tr>
                <th
                  className="px-6 py-3 bg-gray-100 text-left text-xs leading-4 font-semibold text-indigo-700 uppercase cursor-pointer"
                  onClick={() => handleSort("problemNo")}
                >
                  Problem No.
                  {sortBy === "problemNo" && (
                    <span className="ml-1">
                      {sortOrder === "asc" ? "▲" : "▼"}
                    </span>
                  )}
                </th>
                <th
                  className="px-6 py-3 bg-gray-100 text-left text-xs leading-4 font-semibold text-indigo-700 uppercase cursor-pointer"
                  onClick={() => handleSort("title")}
                >
                  Title
                  {sortBy === "title" && (
                    <span className="ml-1">
                      {sortOrder === "asc" ? "▲" : "▼"}
                    </span>
                  )}
                </th>
                <th
                  className="px-6 py-3 bg-gray-100 text-left text-xs leading-4 font-semibold text-indigo-700 uppercase cursor-pointer"
                  onClick={() => handleSort("level")}
                >
                  Difficulty
                  {sortBy === "level" && (
                    <span className="ml-1">
                      {sortOrder === "asc" ? "▲" : "▼"}
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
                    <Link
                      to={`/problem/${problem.problemNo}`}
                      className="text-indigo-600 hover:underline"
                    >
                      {problem.problemNo}
                    </Link>
                  </td>
                  <td className="px-6 py-4 whitespace-no-wrap">
                    {" "}
                    <Link
                      to={`/problem/${problem.problemNo}`}
                      className="text-indigo-600 hover:underline"
                    >
                      {problem.title}
                    </Link>
                  </td>
                  <td
                    className={`px-6 py-4 whitespace-no-wrap ${getDifficultyColor(
                      problem.level
                    )}`}
                  >
                    {problem.level}
                  </td>
                  <td className="px-6 py-4 whitespace-no-wrap">
                    {problem.creator === user && (
                      <Link
                        to={`/edit/problem/${problem.problemNo}`}
                        className="text-indigo-600 hover:underline"
                      >
                        Edit
                      </Link>
                    )}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};

export default ProblemTable;
