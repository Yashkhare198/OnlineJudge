const HttpError = require("../models/http-error");
const { generateFile } = require("../codeExecution/generateFile");
const { executeCode } = require("../codeExecution/executeCode");

const runProgram = async (req, res, next) => {
  const { language, input, code } = req.body;
  if (!language || !code || !input) {
    const error = new HttpError("Missing required fields.", 400);
    return next(error);
  }
  try {
    
      const filePath = await generateFile(language, code);
      if (!filePath) {
        const error = new HttpError("Failed to generate code file", 500);
        return next(error);
      }

      const timeout = 3000; // Set the timeout to 3 seconds (adjust as needed)
      const output = await executeCode(filePath, language, input, timeout);
      if (output.trim() === "Time Limit Exceeded (TLE)") {
        throw err;
      }
     
        res.status(200).json({ output: output.trim() });
      
    
  } catch (err) {
    console.error(err);
    const error = new HttpError("Compilation failed, please try again.", 500);
    return next(error);
  }
};

const submitProgram = async (req, res, next) => {
  const { language, code, input, actualOutput } = req.body;

  if (!language || !code || !input) {
    const error = new HttpError("Missing required fields.", 400);
    return next(error);
  }
  let output;
  try {
    const filePath = await generateFile(language, code);
    const timeout = 3000; // Set the timeout to 3 seconds (adjust as needed);
    try {
      output = await executeCode(filePath, language, input, timeout);
    } catch (err) {
      // Handle "Time Limit Exceeded (TLE)" error here
      if (err === "Time Limit Exceeded (TLE)") {
        res.status(200).json({ verdict: "TLE" });
        return;
      }
      throw err; // Re-throw other errors
    }

    let verdict = "AC"; // Default verdict is Accepted

    if (output.trim() !== actualOutput.trim()) {
      verdict = "WA"; // Change verdict to Wrong Answer if the output doesn't match
    }

    res.status(200).json({ verdict, output: output.trim() });
  } catch (err) {
    console.error(err);
    const error = new HttpError("Execution Failed, please try again.", 500);
    return next(error);
  }
};

exports.runProgram = runProgram;
exports.submitProgram = submitProgram;
