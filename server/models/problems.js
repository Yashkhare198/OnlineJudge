const mongoose = require('mongoose');

const problemSchema = new mongoose.Schema(
  {
    problemNo: {
      type: Number,
      required: true,
      unique: true,
    },
    title: {
      type: String,
      required: true,
    },
    description: {
      type: String,
      required: true,
     
    },
  
    input: {
      type: String,
      required: true,
    },
    output: {
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
  },
  {
    timestamps: true, // Add timestamps
  }
);

const Problem = mongoose.model('Problem', problemSchema);

module.exports = Problem;
