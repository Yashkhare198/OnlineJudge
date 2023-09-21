// routes/problems.js
const express = require('express');
const router = express.Router();
const Problem = require('../models/problems');

// API route to fetch all problems
router.get('/', async (req, res) => {
  try {
    const problems = await Problem.find();
    res.json(problems);
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: 'Server error' });
  }
});


// API route to create a new problem
router.post('/', async (req, res) => {
  try {
    const { problemNo, title, description, testCases, level } = req.body; // Updated field names
    const newProblem = new Problem({ problemNo, title, description, testCases, level }); // Updated field names
    const savedProblem = await newProblem.save();
    res.status(201).json(savedProblem);
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: 'Server error' });
  }
});

module.exports = router;
