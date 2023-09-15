import React, { useState } from 'react';
import axios from 'axios';

function ProblemForm() {
  const [formData, setFormData] = useState({
    problemId: '',
    problemTitle: '',
    difficulty: '',
  });
  const [error, setError] = useState(null);

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.post('http://localhost:8080/api/problems', formData);
      // Check the response status to see if it was successful
      if (response.status === 201) {
        // Handle success (e.g., show a success message)
        console.log('Data sent successfully');
        setError(null); // Clear any previous error message
      } else {
        setError('Error sending data to the server');
      }
    } catch (err) {
      console.error(err);
      setError('Error sending data to the server');
    }
  };

  return (
    <div>
      <h2>Add a Problem</h2>
      {error && <p>{error}</p>}
      <form onSubmit={handleSubmit}>
        <div>
          <label>Problem ID:</label>
          <input
            type="text"
            name="problemId"
            value={formData.problemId}
            onChange={handleChange}
          />
        </div>
        <div>
          <label>Problem Title:</label>
          <input
            type="text"
            name="problemTitle"
            value={formData.problemTitle}
            onChange={handleChange}
          />
        </div>
        <div>
          <label>Difficulty:</label>
          <input
            type="text"
            name="difficulty"
            value={formData.difficulty}
            onChange={handleChange}
          />
        </div>
        <button type="submit">Submit</button>
      </form>
    </div>
  );
}

export default ProblemForm;
