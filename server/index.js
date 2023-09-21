require('dotenv').config();
const express = require('express');
const app = express();
const cors = require('cors');
const bodyParser = require('body-parser');
const Problem = require('./models/problems');
const connection = require("./db");


//Importing routes
const userRoutes = require('./routes/users');
const authRoutes = require('./routes/auth');
const problemRoutes = require('./routes/problem'); // Import the new problems route


//database connections 
connection(); 

//middlewares
app.use(express.json());
app.use(cors());
app.use(bodyParser.json());


//routes
app.use('/api/users', userRoutes);
app.use('/api/auth', authRoutes);
app.use('/api/add-problems', problemRoutes); // Use the problems route





const port = process.env.PORT||8080;
app.listen(port,()=>console.log(`Listening on port ${port}...`));
