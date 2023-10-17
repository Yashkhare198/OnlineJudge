# Online Judge💻 [🔗Live Link](http://ec2-52-62-165-113.ap-southeast-2.compute.amazonaws.com/)

An online judge is an online system to test programs in programming contests or for practicing Data structure & Algorithms’ knowledge through problems. The system can compile and execute your code, and test your code with pre-constructed data called test-cases. Submitted code may be run with restrictions, including time limit, memory limit, security restriction, and so on. The output of the code will be captured by the system, and compared with the standard output. The system will then return the verdict as Accepted, Wrong Answer or different message based on evaluation.

## Table of Contents

- [Features](#features)
- [Technologies Used](#technologies-used)
- [Folder Structure](#folder-structure)
- [Installation](#installation)
- [Usage](#usage)

## Features

- Allow users to create accounts and log in securely.
- Display problems-list, problem statements, input/output formats, and example test cases.
- Allow users to submit their code solutions in various programming languages.
- Validate code submissions for syntax errors.
- Evaluate submitted code against multiple test cases.
- Compile and execute submitted code in isolated environments.

## Technologies Used

- MERN STACK
- MongoDB
- Express.js: 4.18.2
- React: 18.2.0
- Node.js: 18.17.0

## Folder Structure

- Project has 3 folders:
- a) Frontend - handles as name suggests UI part😊
- b) Server - all backend routes
- c) Compiler - execution of the problems

## Installation

- Clone this repository to your local machine.
- Navigate to the project directory.
- Install **frontend** dependencies.

  ```
  cd frontend
  npm install
  ```

- Install **backend** dependencies.

  ```
  cd server
  npm install
  ```

- Install **compiler** dependencies.

  ```
  cd compiler
  npm install
  ```

- Configure **environment** variables.
  - Create a `.env` file in the `compiler`, `server` & `frontend` directory.
  - Add necessary environment variables (e.g., database URI, JWT secret, port-number).
- Start the server
  ```
  cd backend
  npm start
  ```
- Start the client.
  ```
  cd frontend
  npm start
  ```
- Open your browser and go to `http://localhost:3000` to use the app.

## Usage

- Register or log in to your account.
- Users can view the problems and check out the description of the problem by clicking on Solve and submit the solution of the problem in C/C++/Java/Python.
- Users can perform **CRUD** operations over problem API i.e. they can add problems and test cases for it, update the problem and even delete the created problem.
- When a problem is submitted, Verdict will be display.
