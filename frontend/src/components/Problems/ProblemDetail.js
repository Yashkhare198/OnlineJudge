import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useParams, useNavigate } from 'react-router-dom';

import CodeEditor from '../codeEditor/codeEditor';

const ProblemDetail = () => {
  const navigate = useNavigate();

  const user = localStorage.getItem("userId");
  const { problemNo } = useParams();
  const [problem, setProblem] = useState(null);
  const [compilerResult, setCompilerResult] = useState(null);
  const [code, setCode] = useState(`#include <iostream>\nusing namespace std;\nint main()\n{\n  cout << "Hello World";\n  return 0;\n}`);
  const [input, setInput] = useState('');

  const handleCodeChange = (newCode) => {
    setCode(newCode);
  };

  useEffect(() => {
    // Fetch problem details when problemNo changes
    const fetchProblemDetails = async () => {
      try {
        const response = await axios.get(`http://localhost:8080/api/problems`);
        const specificProblem = response.data.problems.find(
          (x) => x.problemNo === parseInt(problemNo)
        );

        if (specificProblem) {
          setProblem({
            title: specificProblem.title || '',
            description: specificProblem.description || '',
            testCases: specificProblem.testCases || '',
            level: specificProblem.level || '',
          });
        } else {
          console.error(`Problem with problemNo ${problemNo} not found`);
          setProblem(null); // Set problem to null to handle the error state
        }
      } catch (error) {
        console.error('Error fetching problem details:', error);
        setProblem(null); // Set problem to null to handle the error state
      }
    };

    if (problemNo) {
      fetchProblemDetails();
    }
  }, [problemNo]);

  const runCode = async () => {
    if (!user) {
      // Store the problem number for later use
      localStorage.setItem('redirectProblemNo', problemNo);
      navigate('/login');
    } else {
      try {
        const response = await axios.post('http://localhost:5001/api/execution/run', {
          language: 'cpp',
          input,
          code,
        });

        setCompilerResult(response.data.output);
      } catch (error) {
        console.error('Error running code:', error);
        setCompilerResult('Error running code. Please check your code and try again.');
      }
    }
  };

  if (problem === null) {
    return (
      <div className="max-w-screen-xl mx-auto p-6">
        <div className="bg-cream py-6 px-8 rounded-lg shadow-lg text-center">
          <h2 className="text-2xl font-bold mb-4 text-indigo-800">Loading...</h2>
        </div>
      </div>
    );
  }

  const problemTitle = `${problemNo}. ${problem.title}`;

  // ... (previous code)

return (
  <div className="max-w-screen-xl mx-auto p-6 grid grid-cols-2 gap-4">
    <div className="bg-white p-6 rounded shadow-md">
      <h2 className="text-2xl font-semibold text-indigo-800">{problemTitle}</h2>
      <p className="text-lg text-gray-600 mt-2">{problem.level}</p>
      <p className="text-base text-gray-800 mt-4">{problem.description}</p>
      <p className="text-base text-gray-800 mt-4">Test Cases: {problem.testCases}</p>
    </div>
    <div className="bg-white p-6 rounded shadow-md">
      <CodeEditor code={code} onChange={handleCodeChange} />
      <div className="mt-4">
        <label className="font-semibold text-gray-800">User Input:</label>
        <textarea
          rows="5"
          value={input}
          onChange={(e) => setInput(e.target.value)}
          className="border rounded w-full p-2 mt-2"
        />
      </div>
      <button
        onClick={runCode}
        className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded mt-4 focus:outline-none focus:shadow-outline"
      >
        Run Code
      </button>
      <div className="mt-4">
        <h3 className="text-2xl font-semibold text-indigo-800">Compiler Result:</h3>
        <div className="border p-4 rounded mt-2">
          <pre className="text-gray-800">{compilerResult}</pre>
        </div>
      </div>
    </div>
  </div>
);
}


export default ProblemDetail;
