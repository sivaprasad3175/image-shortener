const express = require('express');
const cors = require('cors');
const mongoose = require('mongoose');
const imageRoutes = require('./routes/imageRoutes');
require('dotenv').config();

const app = express();

// Middleware
app.use(cors());
app.use(express.json());

// Routes
app.use('/', imageRoutes);

// MongoDB connection
mongoose.connect(process.env.MONGO_URI)
  .then(() => console.log("MongoDB connected"))
  .catch(err => console.error("MongoDB error:", err));

module.exports = app;