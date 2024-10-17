// Import necessary modules
const express = require('express');       // Express framework for building server-side applications
const mongoose = require('mongoose');     // Mongoose for interacting with MongoDB
const cors = require('cors');             // CORS middleware for enabling cross-origin requests
const bodyParser = require('body-parser');// Body-parser for parsing incoming request bodies
const dotenv = require('dotenv');         // Dotenv for loading environment variables
const userRoutes = require('../routes/user'); // Import user routes from the routes directory

// Load environment variables from the .env file
dotenv.config();

// Create an instance of the Express application
const app = express();

// Define the port to be used by the server (from environment variable or fallback to 3000)
const port = process.env.PORT || 3000;

// Enable CORS for all routes (allows cross-origin requests from different domains)
app.use(cors());

// Use bodyParser middleware to parse JSON requests
app.use(bodyParser.json());

// Prefix all user-related routes with '/api/users'
app.use('/api/users', userRoutes);

// Connect to MongoDB using the connection string defined in environment variables
mongoose.connect(process.env.MONGODB_URI, {
    useNewUrlParser: true,   // Use the new URL string parser
    useUnifiedTopology: true // Use the new unified topology engine for MongoDB
})
    .then(() => console.log('Connected to MongoDB')) // Log a success message on successful connection
    .catch((err) => console.error('MongoDB connection error:', err)); // Handle connection errors

// Start the server and listen on the specified port
app.listen(port, () => {
    console.log(`Server is running on port ${port}`);
});
