import React from 'react';
import { useParams } from 'react-router-dom';

const ProblemDetail = ({ problems }) => {
  const { problemNo } = useParams(); // We use useParams() hook to extract route parameters from the URL. 
  const problem = problems.find((p) => p.problemNo === problemNo);

  if (!problem) {
    // Handle the case when the problem is not found
    return (
      <div className="max-w-screen-lg mx-auto p-6">
        <div className="bg-cream py-6 px-8 rounded-lg shadow-lg text-center">
          <h2 className="text-2xl font-bold mb-4 text-indigo-800">
            Problem not found.
          </h2>
        </div>
      </div>
    );
  }

  const problemTitle = `${problem.problemNo}. ${problem.title}`; //So the problem no. is show along its title.

  return (
    <div className="max-w-screen-lg mx-auto p-6">
      <div className="bg-cream py-6 px-8 rounded-lg shadow-lg">
        <h2 className="text-3xl font-bold mb-4 text-indigo-800">
          {problemTitle}
        </h2>
        {/* <div className="mb-4">
          <span className="font-semibold">Problem No:</span> {problem.problemNo}
        </div> */}
        <div className="mb-4">
          <span className="font-semibold">Difficulty:</span> {problem.level}
        </div>
        <div className="mb-4">
          <span className="font-semibold">Description:</span> {problem.description}
        </div>
        <div className="mb-4">
          <span className="font-semibold">Test Cases:</span> {problem.testCases}
        </div>
       
      </div>
    </div>
  );
};

export default ProblemDetail;
