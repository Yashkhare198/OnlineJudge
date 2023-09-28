// model.js

const mongoose = require('mongoose');

const problemSchema = new mongoose.Schema({
  problemNo: {
    type: Number,
    required: true,
    unique: true, // Ensure problem numbers are unique
  },
  title: {
    type: String,
    required: true,
    trim: true,
  },
  description: {
    type: String,
    required: true,
    trim: true,
  },
  testCases: {
    type: String,
    required: true,
  },
  level: {
    type: String,
    enum: ['Easy', 'Medium', 'Hard'],
    required: true,
  },
  creator: {
    type: mongoose.Types.ObjectId,
    required: true,
    ref: 'User',
  },
});

const Problem = mongoose.model('Problem', problemSchema);

module.exports = Problem;
