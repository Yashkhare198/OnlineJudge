import React, { useState, useEffect } from "react";
import axios from "axios";
import { useParams, useNavigate } from "react-router-dom";

import CodeEditor from "../codeEditor/codeEditor";

const ProblemDetail = () => {
  const navigate = useNavigate();

  const user = localStorage.getItem("userId");
  const { problemNo } = useParams();
  const [problem, setProblem] = useState(null);

  const [selectedLanguage, setSelectedLanguage] = useState("cpp");
  const [code, setCode] = useState(
    `#include <iostream>\nusing namespace std;\nint main()\n{\n  cout << "Hello World";\n  return 0;\n}`
  );
  const [subInput, setSubInput] = useState(null);
  const [input, setInput] = useState(null);
  const [output, setOutput] = useState();
  const [verdict, setVerdict] = useState();
  const [message, setMessage] = useState();
  const [actualOutput, setActualOutput] = useState();
  const handleCodeChange = (newCode) => {
    setCode(newCode);
  };

  useEffect(() => {
    // Fetch problem details when problemNo changes
    if(selectedLanguage==='java')
    {
      setCode(`public class Main{
        public static void main(String[] args){
          System.out.println("Be Creative");
        }
      }`);
    }
    else{
      setCode( `#include <iostream>\nusing namespace std;\nint main()\n{\n  cout << "Hello World";\n  return 0;\n}`);
    }
    const fetchProblemDetails = async () => {
      try {
        const response = await axios.get(
          `${process.env.REACT_APP_SERVER_PATH}/api/problems`
        );
        const specificProblem = response.data.problems.find(
          (x) => x.problemNo === parseInt(problemNo)
        );

        if (specificProblem) {
          setProblem({
            title: specificProblem.title || "",
            description: specificProblem.description || "",

            // testCases: specificProblem.testCases || "",
            level: specificProblem.level || "",
          });

          setInput(specificProblem.input);
          setSubInput(specificProblem.input);
          setActualOutput(specificProblem.output);
        } else {
          console.error(`Problem with problemNo ${problemNo} not found`);
          setProblem(null); // Set problem to null to handle the error state
        }
      } catch (error) {
        console.error("Error fetching problem details:", error);
        setProblem(null); // Set problem to null to handle the error state
      }
    };

    if (problemNo) {
      fetchProblemDetails();
    }
  }, [problemNo,selectedLanguage]);

  const runCode = async () => {
    if (!user) {
      // Store the problem number for later use
      localStorage.setItem("redirectProblemNo", problemNo);
      navigate("/login");
    } else {
      try {
        const response = await axios.post(
          `${process.env.REACT_APP_COMPILER_PATH}/api/execution/run`,
          {
            language: selectedLanguage,
            input,
            code,
          }
        );

        setOutput(response.data.output);
        setMessage();
        setVerdict();
      } catch (error) {
        setVerdict();
        console.error("Error running code:", error);
        setOutput("Error running code. Please check your code and try again.");
      }
    }
  };

  const programSubmitHandler = async (event) => {
    event.preventDefault();
    let responseData;
    try {
      responseData = await axios.post(
        `${process.env.REACT_APP_COMPILER_PATH}/api/execution/submit`,
        {
          language: selectedLanguage,
          code: code,
          input: subInput,
          actualOutput: actualOutput,
        }
      );

      setOutput(responseData.data.output);

      setVerdict(responseData.data.verdict);
      setMessage();
    } catch (err) {
      setOutput();
      setVerdict();
      setMessage(
        err +
          "\nPlease check if you have selected the proper language or input."
      );
    }
  };

  const handleEditorChange = (value, event) => {
    setCode(value);
  };

  if (problem === null) {
    return (
      <div className="max-w-screen-xl mx-auto p-6">
        <div className="bg-cream py-6 px-8 rounded-lg shadow-lg text-center">
          <h2 className="text-2xl font-bold mb-4 text-indigo-800">
            Loading...
          </h2>
        </div>
      </div>
    );
  }

  const problemTitle = `${problemNo}. ${problem.title}`;

  return (
    <div className="max-w-screen-xl mx-auto p-6 grid grid-cols-2 gap-4">
      <div
        className="col-span-1 bg-yellow-100 p-6 rounded shadow-md"
        style={{ border: "20px solid black" }}
      >
        <h2 className="text-2xl font-semibold text-indigo-800 whitespace-pre-wrap">
          {problemTitle}
        </h2>
        <p className="text-lg text-gray-600 mt-2 whitespace-pre-wrap">
          Difficulty: {problem.level}
        </p>
        <p className="text-lg text-stone-900  mt-4 whitespace-pre-wrap">
          {problem.description}
        </p>
        {/* <p className="text-base text-gray-800 mt-4">
          Test Cases: {problem.testCases}
        </p> */}
      </div>
      <div className="col-span-1 bg-slate-300 p-6 rounded shadow-md">
        <div className="mb-4" >
          <label
            className="block text-gray-700 text-xl font-bold mb-2"
            htmlFor="selectedLanguage"
          >
            Choose a Language:
          </label>
          <select
           className="w-full p-2 border-2 border-black rounded shadow focus:outline-none "
            id="selectedLanguage"
            value={selectedLanguage}
            required
            onChange={(e) => setSelectedLanguage(e.target.value)}
          >
            <option value="cpp">C++</option>
            <option value="java">Java</option>
            {/* <option value="Hard">Hard</option> */}
          </select>
          {selectedLanguage === "java" && (
            <p
              style={{
                color: "red",
                fontWeight: "bold",
                margin: "0rem 0rem 0.5rem 0.0rem",
              }}
            >
              Please keep class name as "public class Main".
            </p>
          )}
        </div>
        <CodeEditor code={code} onChange={handleCodeChange} />
        <div className="grid grid-cols-2 gap-4 mt-4">
          <div>
            <label className="font-semibold text-gray-800 whitespace-pre">
              User Input:
            </label>
            <textarea
              rows="5"
              value={input}
              onChange={(e) => setInput(e.target.value)}
              className="border rounded w-full p-2"
            />
          </div>
          <div>
            <label className="font-semibold text-gray-800 whitespace-pre">
              User Output:
            </label>
            <textarea
              readOnly
              rows="5"
              value={output}
              className="border rounded w-full p-2"
            />
          </div>
        </div>
        <div>
          <button
            onClick={runCode}
            className="bg-gray-600 hover:bg-gray-800 text-white font-bold py-2 px-4 rounded mt-4 focus-outline-none focus-shadow-outline"
          >
            Run Code
          </button>
          <span style={{ margin: "10px" }}></span>
          <button
            onClick={programSubmitHandler}
            className="bg-green-500 hover-bg-green-700 text-white font-bold py-2 px-4 rounded mt-4 focus-outline-none focus-shadow-outline"
          >
            Submit
          </button>
        </div>
        <div>
          {verdict === "AC" && (
            <div className="verdict" style={{ color: "black" }}>
              <span style={{ fontWeight: "bold" }}>VERDICT: </span>
              <span style={{ color: "green", fontWeight: "bold" }}>
                ACCEPTED
              </span>
            </div>
          )}
          {verdict === "TLE" && (
            <div className="verdict" style={{ color: "black" }}>
              <span style={{ fontWeight: "bold" }}>VERDICT: </span>
              <span style={{ color: "red", fontWeight: "bold" }}>
                TIME LIMIT EXCEEDED
              </span>
            </div>
          )}

          {/* {setMessage && (
            <div
              // className="tle-message"
              style={{ color: "red", fontWeight: "bold" }}
            >
              {setMessage}
            </div>
          )} */}

          {verdict === "WA" && (
            <div className="verdict" style={{ color: "black" }}>
              <span style={{ fontWeight: "bold" }}>VERDICT: </span>
              <span style={{ color: "red", fontWeight: "bold" }}>
                WRONG ANSWER
              </span>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default ProblemDetail;
