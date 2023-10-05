import React from 'react';

const About = () => {
  return (
    <div className="flex justify-center items-center h-screen bg-blue-900">
      <div className="text-center p-8 bg-white rounded-lg shadow-lg text-black">
        <h1 className="text-5xl font-semibold mb-4">Welcome to CodeHub!</h1>
        <p className="text-2xl text-gray-700 mb-6">
          Your one-stop destination for problem-solving and coding inspiration.
        </p>
        <p className="text-xl text-gray-600">
          Made with ❤️ in India.
        </p>
      </div>
    </div>
  );
};

export default About;
