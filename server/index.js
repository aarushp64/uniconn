
const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');

const app = express();
const PORT = process.env.PORT || 5000;

// Middleware
app.use(cors());
app.use(express.json());

// MongoDB Connection
// Replace with your actual connection string
const MONGODB_URI = 'mongodb://localhost:27017/uniconn';

mongoose.connect(MONGODB_URI, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
})
    .then(() => console.log('MongoDB Connected'))
    .catch(err => console.error('MongoDB connection error:', err));

// Basic Route
app.get('/', (req, res) => {
    res.send('UniConn API is running');
});

// Import Routes
// const postsRoute = require('./routes/posts');
// app.use('/api/posts', postsRoute);

app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
});
