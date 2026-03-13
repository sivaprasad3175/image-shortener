const mongoose = require('mongoose');

const ImageSchema = new mongoose.Schema({
    shortId: { type: String, unique: true },
    originalName: String,
    s3Key: String,
    url: String,
    createdAt: { type: Date, default: Date.now }
});

module.exports = mongoose.model('Image', ImageSchema);