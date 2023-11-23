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

  
    const separator = process.platform === "win32" ? "\\" : "/";
    const command = {
      cpp: [
        `g++ "${filepath}" -o "${outPath}" && cd "${outputPath}" && .${separator}${jobId}.exe < "${custominputpath}"`,
      ],
      py: [`python ${filepath} < ${custominputpath}`],
      java: [`java "${filepath}" < "${custominputpath}"`],
    };

    return new Promise((resolve, reject) => {
      const executeCode = exec(
        command[language][0],
        (error, stdout, stderr) => {
          if (error) {
            reject(error);
          }
          if (stderr) {
            reject(stderr);
          }
          //   console.log(stdout);
          resolve(stdout);
        }
      );
      // executeCode.stdin.end();
      setTimeout(() => {
        executeCode.kill();
        reject(`Time Limit Exceeded (TLE)`);
      }, timeout);
    });
  };

module.exports = {
  executeCode,
};
