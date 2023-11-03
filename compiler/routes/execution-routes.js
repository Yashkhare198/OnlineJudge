const express = require("express");
const executionControllers = require("../controllers/execution-controllers");

const routes = express.Router();

// /api/execution/run
routes.post("/run", executionControllers.runProgram);
routes.post("/submit", executionControllers.submitProgram);

module.exports = routes;