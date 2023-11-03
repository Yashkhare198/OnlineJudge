import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import axios from 'axios';

const EditProblemForm = () => {
  const { problemNo } = useParams();
  const navigate = useNavigate();

  const [problem, setProblem] = useState({
    title: '',
    description: '',
    // testCases: '',
    input: '',
    output: '',
    level: '',
  });
  const [error, setError] = useState(null);
  const [success, setSuccess] = useState(false);

  useEffect(() => {
    // Fetch the problem details for editing
    axios
      .get(`${process.env.REACT_APP_SERVER_PATH}/api/problems`)
      .then((response) => {
        const specificProblem = response.data.problems.find((x) => x.problemNo === parseInt(problemNo));

        if (specificProblem) {
          // Set the problem state with the initial data
          setProblem({
            title: specificProblem.title || '',
            description: specificProblem.description || '',
            // testCases: specificProblem.testCases || '',
            input:specificProblem.input || '',
            output:specificProblem.output || '',
            level: specificProblem.level || '',
          });
        } else {
          console.error(`Problem with problemNo ${problemNo} not found`);
        }
      })
      .catch((error) => {
        console.error('Error fetching problem details:', error);
      });
  }, [problemNo]);

  const handleEditProblem = async () => {
    try {
      const response = await axios.patch(
        `${process.env.REACT_APP_SERVER_PATH}/api/problems/${problemNo}`,
        problem
      );

      if (response.status === 200) {
        console.log('Problem updated successfully');
        setError(null);
        setSuccess(true);

        navigate(`/problem/${problemNo}`);
      } else {
        setError('Error updating problem');
      }
    } catch (err) {
      console.error('Error updating problem:', err);
      setError('Error updating problem');
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-indigo-400">
    <div className=" bg-orange-200 rounded-lg shadow-lg p-4 max-w-md w-full sm:w-2/3 md:w-1/2 lg:w-1/3 overflow-y-auto">
      <h2 className="text-2xl font-bold mb-4 text-blue-600">Edit Problem</h2>
      <form >
        <div className="mb-4">
          <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="title">
            Title:
          </label>
          <input
            className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
            type="text"
            id="title"
            value={problem.title}
            onChange={(e) => setProblem({ ...problem, title: e.target.value })}
          />
        </div>
        <div className="mb-4">
          <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="description">
            Description:
          </label>
          <textarea
            className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
            id="description"
            value={problem.description}
            onChange={(e) => setProblem({ ...problem, description: e.target.value })}
          />
        </div>
        {/* <div className="mb-4">
          <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="testCases">
            Test Cases:
          </label>
          <textarea
            className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
            id="testCases"
            value={problem.testCases}
            onChange={(e) => setProblem({ ...problem, testCases: e.target.value })}
          />
        </div> */}
        <div className="mb-4">
          <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="input">
            Input:
          </label>
          <textarea
            className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
            id="input"
            value={problem.input}
            onChange={(e) => setProblem({ ...problem, input: e.target.value })}
          />
        </div>
        <div className="mb-4">
          <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="output">
            Output:
          </label>
          <textarea
            className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
            id="output"
            value={problem.output}
            onChange={(e) => setProblem({ ...problem, output: e.target.value })}
          />
        </div>
        <div className="mb-4">
          <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="level">
            Difficulty:
          </label>
          <select
            className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
            id="level"
            value={problem.level}
            onChange={(e) => setProblem({ ...problem, level: e.target.value })}
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
            onClick={handleEditProblem}
          >
            Update Problem
          </button>
        </div>
        {error && <p className="text-red-500">{error}</p>}
        {success && <p className="text-green-500">Problem updated successfully!</p>}
      </form>
    </div>
    </div>
    
  );
};

export default EditProblemForm;
