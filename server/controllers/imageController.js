const { nanoid } = require('nanoid');
const { S3Client, PutObjectCommand } = require('@aws-sdk/client-s3');
const Image = require('../models/Image');

// S3 Client
const s3 = new S3Client({
    region: process.env.AWS_REGION,
    credentials: {
        accessKeyId: process.env.AWS_ACCESS_KEY_ID,
        secretAccessKey: process.env.AWS_SECRET_ACCESS_KEY
    }
});

exports.uploadImage = async (req, res) => {
    try {
        const file = req.file;
        if (!file) return res.status(400).json({ error: "No file uploaded" });

        const shortId = nanoid(6);
        const key = `images/${shortId}-${file.originalname}`;

        // Upload to S3
        const uploadParams = {
            Bucket: process.env.S3_BUCKET,
            Key: key,
            Body: file.buffer,
            ContentType: file.mimetype
        };

        await s3.send(new PutObjectCommand(uploadParams));

        const imageUrl = `${process.env.CDN_URL}/${key}`;

        await Image.create({
            shortId,
            originalName: file.originalname,
            s3Key: key,
            url: imageUrl
        });

        res.json({ shortUrl: `${process.env.BASE_URL}/${shortId}` });
    } catch (err) {
        console.error(err);
        res.status(500).json({ error: "Upload failed" });
    }
};

exports.getImage = async (req, res) => {
    try {
        const { shortId } = req.params;

        const image = await Image.findOne({ shortId });
        if (!image) return res.status(404).send("Not found");

        res.redirect(image.url);
    } catch (err) {
        console.error(err);
        res.status(500).send("Server Error");
    }
};