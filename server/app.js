const express = require('express');
const cors = require('cors');
const mongoose = require('mongoose');
const imageRoutes = require('./routes/imageRoutes');
require('dotenv').config();

const app = express();

// Middleware
app.use(cors());
app.use(express.json());

// ===== Get URL Path Logic =====
app.use((req, res, next) => {
  const protocol = req.protocol;
  const host = req.get('host');
  const path = req.originalUrl;

  const fullUrl = `${protocol}://${host}${path}`;

  console.log("Method:", req.method);
  console.log("Path:", path);
  console.log("Full URL:", fullUrl);

  next();
});

// Routes
app.use('/', imageRoutes);

// MongoDB connection
mongoose.connect(process.env.MONGO_URI)
  .then(() => console.log("MongoDB connected"))
  .catch(err => console.error("MongoDB error:", err));

module.exports = app;