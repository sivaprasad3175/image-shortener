const express = require('express');
const router = express.Router();
const multer = require('multer');
const { uploadImage, getImage } = require('../controllers/imageController');

const storage = multer.memoryStorage();
const upload = multer({ storage });

router.post('/upload', upload.single('image'), uploadImage);
router.get('/:shortId', getImage);

module.exports = router;