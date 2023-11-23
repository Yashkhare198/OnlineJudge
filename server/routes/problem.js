// route.js

const express = require('express');
const router = express.Router();
const Problem = require('../models/problems');
const User = require('../models/user');
const axios = require('axios');


// Define the route for getting all problems and the next problem number
router.get('/', async (req, res) => {
  try {
    const problems = await Problem.find();
    
    const highestProblem = await Problem.findOne().sort({ problemNo: -1 });
    let nextProblemNo = 1;

    if (highestProblem) {
      nextProblemNo = highestProblem.problemNo + 1;
    }
    
    res.json({ problems, nextProblemNo });
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: 'Server error' });
  }
});

//update
router.patch('/:problemNo', async (req, res) => {
  try {
    const { problemNo } = req.params;
    const updateFields = req.body;

    const updatedProblem = await Problem.findOneAndUpdate(
      { problemNo: problemNo },
      { $set: updateFields },
      { new: true }
    );

    if (!updatedProblem) {
      return res.status(404).json({ error: 'Problem not found' });
    }

    res.json(updatedProblem);
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: 'Server error' });
  }
});


// Create a new problem
router.post('/', async (req, res) => {
  try {
    const { title, description, input,output, level, creator } = req.body;

    // Fetch the next problem number from the server
    const nextProblemResponse = await axios.get(`${process.env.REACT_APP_SERVER_PATH}/api/problems`);
    const nextProblemNo = nextProblemResponse.data.nextProblemNo;

    const newProblem = new Problem({
      problemNo: nextProblemNo, // Use the next problem number
      title,
      description,
      input,
      output,
      level,
      creator,
    });

    const savedProblem = await newProblem.save();

    // Optionally, you can update the user's list of problems
    // const problemCreator = await User.findById(creator);
    // problemCreator.problems.push(savedProblem._id);
    // await problemCreator.save();

    res.status(201).json(savedProblem);
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: 'Server error' });
  }
});


module.exports = router;
