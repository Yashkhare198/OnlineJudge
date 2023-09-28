require('dotenv').config();
const express = require('express');
const app = express();
const cors = require('cors');
const bodyParser = require('body-parser');
const connection = require('./db');

// Importing routes
const userRoutes = require('./routes/users');
const authRoutes = require('./routes/auth');
const problemsRoutes = require('./routes/problem') // Use the new 'problems' route

// Database connections
connection();



// Middlewares
app.use(express.json());
app.use((req, res, next) => {
    res.setHeader("Access-Control-Allow-Origin", "*");
    res.setHeader(
      "Access-Control-Allow-Headers",
      "Origin, X-Requested-With, Content-Type, Accept, Authorization"
    );
    res.setHeader("Access-Control-Allow-Methods", "GET, POST, PATCH, DELETE");
  
    next();
  });
app.use(bodyParser.json());

// Routes
app.use('/api/users', userRoutes);
app.use('/api/auth', authRoutes);
app.use('/api/problems', problemsRoutes); // Use the new 'problems' route
// app.use('/api/problems/problemNo',problemsRoutes);


const port = process.env.PORT || 8080;
app.listen(port, () => console.log(`Listening on port ${port}...`));
