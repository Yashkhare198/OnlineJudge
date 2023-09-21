const mongoose = require('mongoose');

const problemSchema = new mongoose.Schema({
  problemNo: {
    type: String,
    required: true,
    trim: true, //If true it removes leading and trailing whitespaces 
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
    enum: ['easy', 'medium', 'hard'], // To restrict to specific values
    required: true,
  },
});


const Problem = mongoose.model('Problem', problemSchema);

module.exports = Problem;
