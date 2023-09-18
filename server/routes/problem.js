// routes/problems.js
const express = require('express');
const router = express.Router();
const Problem = require('../models/problems');

// API route to fetch all problems
router.get('/', async (req, res) => { // Use 'get' instead of 'post'
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
      const { problemId, problemTitle, difficulty } = req.body; // Update field names
      const newProblem = new Problem({ problemId, problemTitle, difficulty }); // Update field names
      const savedProblem = await newProblem.save();
      res.status(201).json(savedProblem); // Set status to 201 for success
    } catch (err) {
      console.error(err);
      res.status(500).json({ error: 'Server error' });
    }
  });

module.exports = router;
