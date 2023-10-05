const { exec } = require("child_process");
const fs = require("fs");
const path = require("path");



const outputPath = path.join(__dirname, "outputs");

if (!fs.existsSync(outputPath)) {
  fs.mkdirSync(outputPath, { recursive: true });
}


const appendCustomInput = async (path, data) => {
  try {
    fs.appendFile(path, data, (err) => {
      if (err)
        console.log(err);
    });
  } catch (error) {
    console.log(error);
  }
};


const executeCpp = (filepath, input) => {
  const jobId = path.basename(filepath).split(".")[0];
  const outPath = path.join(outputPath, `${jobId}.exe`);
  const custominputpath = path.join(outputPath, `${jobId}.input.txt`);
  console.log(jobId);
  console.log(input);
  appendCustomInput(custominputpath, input); // Ensure 'input' is defined

  return new Promise((resolve, reject) => {
    const command = `g++ "${filepath}" -o "${outPath}" && cd "${outputPath}" && .\\${jobId}.exe < "${custominputpath}"`;

    const childProcess = exec(command, (error, stdout, stderr) => {
      if (error) {
        console.error("Error executing command: " + command);
        console.error(stderr);
        reject({ error, stderr });
      } else {
        console.log("Executing command: " + command);
        console.log("Output:");
        process.stdout.write(stdout); // Flush the standard output immediately
        resolve(stdout);
      }
    });

    // Display any output from the child process as it arrives
    childProcess.stdout.on('data', (data) => {
      process.stdout.write(data);
    });

    childProcess.stderr.on('data', (data) => {
      process.stderr.write(data);
    });
  });
};

module.exports = {
  executeCpp,
};
