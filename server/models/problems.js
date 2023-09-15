

const mongoose = require('mongoose');


const problemSchema = new mongoose.Schema({
  problemId: {
    type: String,
    required: true,
  },
  problemTitle: {
    type: String,
    required: true,
  },
  difficulty: {
    type: String,
    required: true,
  },
});


const Problem = mongoose.model('Problem', problemSchema);

module.exports = Problem;
