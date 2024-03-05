// Import necessary modules
const express = require('express');
const dotenv = require('dotenv');
const { PORT } = require('./config/config');
const router = require("./routes/index")
const path = require("path");
const cors = require("cors");
const bodyParser = require("body-parser")
// Load environment variables from .env file
dotenv.config();

// Create an instance of Express
const app = express();

app.use(cors({ origin: "http://localhost:3000", methods: "*" }));
app.use(bodyParser.urlencoded({ extended: true }));

app.use(bodyParser.json());

// Middleware to parse JSON requests
app.use(express.json());

// set routes for apis
app.use("/api", router);

// set path for multer (to upload userImage)
app.use('/uploads', express.static(path.join(__dirname, 'uploads')));

// Define routes and other functionality
app.get('/', (req, res) => {
    res.send({ message: 'Welcome to the backend server!' });
});



// Example route using environment variables
app.get('/config', (req, res) => {
    res.send({message:"main route"}); 
});

// Start the server
// const port = process.env.PORT || 3000;
app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
});
