require('dotenv').config();  // Load environment variables
const express = require('express');
const cors = require('cors');
const emailRoutes = require('./routes/emailRoutes');  // Import email routes

const app = express();
const port = 3000;

// Middleware for parsing JSON requests
app.use(express.json());

// Enable CORS for specific frontend domain
const corsOptions = {
  origin: ['http://localhost:3001'], // Replace with your frontend URL
  methods: ['GET', 'POST'],
  allowedHeaders: ['Content-Type'],
};
app.use(cors(corsOptions));

// Mount email routes
app.use('/api', emailRoutes);

app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});
