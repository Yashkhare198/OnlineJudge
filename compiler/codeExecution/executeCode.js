const { exec } = require("child_process");
const fs = require("fs");
const path = require("path");

const outputPath = path.join(__dirname, "outputs");


if (!fs.existsSync(outputPath)) {
  fs.mkdirSync(outputPath, { recursive: true });
}

const appendCustomInput = async (filePath, data) => {
  try {
    fs.appendFile(filePath, data, (err) => {
      if (err) {
        console.log(err);
      }
    });
  } catch (error) {
    console.log(error);
  }
};




const executeCode = (filepath, language, input, timeout) => {
  const jobId = path.basename(filepath).split(".")[0];
  const outPath = path.join(outputPath, `${jobId}.exe`);
  const custominputpath = path.join(outputPath, `${jobId}.input.txt`);
  const maxBuffer = 1024 * 1024;

  appendCustomInput(custominputpath, input);

  return new Promise((resolve, reject) => {
    const separator = process.platform === "win32" ? "\\" : "/";
    const command = `g++ "${filepath}" -o "${outPath}" && cd "${outputPath}" && .${separator}${jobId}.exe < "${custominputpath}"`;

    const childProcess = exec(command,{ maxBuffer: maxBuffer }, (error, stdout, stderr) => {
      if (error) {
        reject({ error, stderr });
      } else {
        resolve(stdout);
      }
    });

    setTimeout(() => {
      childProcess.kill();
      reject(`Time Limit Exceeded (TLE)`);
    }, timeout); // Set the timeout value in milliseconds
  });
};

module.exports = {
  executeCode,
};
