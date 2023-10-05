require('dotenv').config();
const express = require('express');
const cors = require('cors');
const bodyParser = require('body-parser');
const connection = require('./db');
const app = express();

// Importing routes
const userRoutes = require('./routes/users');
const authRoutes = require('./routes/auth');
const problemsRoutes = require('./routes/problem') // Use the new 'problems' route

// Database connections
connection();



// Middlewares


app.use(cors());
app.use(express.urlencoded({extended:true}));
app.use(express.json());


// Routes
app.use('/api/users', userRoutes);
app.use('/api/auth', authRoutes);
app.use('/api/problems', problemsRoutes); // Use the new 'problems' route
// app.use('/api/problems/problemNo',problemsRoutes);


const port = process.env.PORT || 8080;
app.listen(port, () => console.log(`Listening on port ${port}...`));
