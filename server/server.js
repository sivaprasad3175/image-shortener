require('dotenv').config();
const app = require('./app');
const { S3Client, ListBucketsCommand } = require('@aws-sdk/client-s3');

const PORT = process.env.PORT || 4000;

// Create S3 client here so it's defined before use
const s3 = new S3Client({
  region: process.env.AWS_REGION,
  credentials: {
    accessKeyId: process.env.AWS_ACCESS_KEY_ID,
    secretAccessKey: process.env.AWS_SECRET_ACCESS_KEY,
  },
});

async function verifyAWSCredentials() {
  try {
    const buckets = await s3.send(new ListBucketsCommand({}));
    console.log('✅ AWS connected. Buckets:', buckets.Buckets.map(b => b.Name));
  } catch (err) {
    console.error('❌ AWS credential error:', err.message);
  }
}

app.listen(PORT, async () => {
  console.log(`🚀 Server running on port ${PORT}`);
  await verifyAWSCredentials();
});