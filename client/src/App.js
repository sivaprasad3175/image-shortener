import React, { useState } from 'react';
import axios from 'axios';

function App() {
  const [file, setFile] = useState(null);
  const [shortUrl, setShortUrl] = useState('');

  const handleUpload = async () => {
    if (!file) {
      alert("Please select a file");
      return;
    }

    try {
      const formData = new FormData();
      formData.append('image', file); // must match backend multer key 'image'

      const res = await axios.post('http://54.89.157.170:5000/upload', formData, {
        headers: { 'Content-Type': 'multipart/form-data' }
      });

      setShortUrl(res.data.shortUrl);
    } catch (err) {
      console.error(err.response ? err.response.data : err.message);
      alert("Upload failed: " + (err.response?.data?.error || err.message));
    }
  };

  return (
    <div style={{ padding: 50 }}>
      <h1>Image Upload</h1>
      <input type="file" onChange={e => setFile(e.target.files[0])} />
      <button onClick={handleUpload}>Upload</button>
      {shortUrl && <p>Short URL: <a href={shortUrl}>{shortUrl}</a></p>}
    </div>
  );
}

export default App;