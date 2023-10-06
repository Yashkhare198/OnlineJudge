const HttpError = require("../models/http-error");
const { generateFile } = require("../cpp/generateFile");
const { executeCpp } = require("../cpp/executeCpp");

const runProgram = async (req, res, next) => {
    const { language,input,code } = req.body;
    try {
      if(code===undefined)
      return res.status(404).json({success:false,error:'empty code'});
      if (language === "cpp") {
        const filePath = await generateFile(language, code);
        if (!filePath) {
          // Handle the case where code generation fails
          const error = new HttpError("Failed to generate code file", 500);
          return next(error);
        }
        const output = await executeCpp(filePath,input);

        // if (output === null) {
        //   // Handle the case where code execution fails
        //   const error = new HttpError("Failed to run the code", 500);
        //   return next(error);
        // }
        

        res.status(200).json({output});
      }
    } catch (err) {
      console.error(err);
      const error = new HttpError("Failed to run the code", 500);
      return next(error);
    }
};

exports.runProgram = runProgram;
