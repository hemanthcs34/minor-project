const express = require('express');
const cors = require('cors');
const dotenv = require('dotenv');

// Import routes
const adoptRoutes = require('./routes/adoptRoutes');
const animalRoutes = require('./routes/animalRoutes');

// Initialize
dotenv.config();
const app = express();
const PORT = process.env.PORT || 3000;

// Middleware
app.use(cors());
app.use(express.json());
app.use(express.static('uploads'));

// Add logging middleware
app.use((req, res, next) => {
    console.log(`${new Date().toISOString()} - ${req.method} ${req.url}`);
    next();
});

// Route Middleware
app.use('/api/adopt', adoptRoutes);
app.use('/api/animals', animalRoutes);

// Error handling middleware
app.use((err, req, res, next) => {
    console.error(err.stack);
    res.status(500).send('Something broke!');
});

// Start server
app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
});