const express = require('express');
const app = express();
const { exec } = require('child_process');
const axios = require('axios');
const { v4: uuidv4 } = require('uuid');

app.use(express.json());

app.post('/api/download/youtube', async (req, res) => {
  const { url } = req.body;
  try {
    const response = await axios.get(`https://www.youtube.com/oembed?url=${url}&format=json`);
    if (response.data && response.data.thumbnail_url) {
      const videoUrl = response.data.thumbnail_url.replace('hqdefault.jpg', 'maxresdefault.jpg');
      res.json({ success: true, url: videoUrl });
    } else {
      throw new Error('Failed to retrieve video URL');
    }
  } catch (error) {
    console.error(error);
    res.status(500).json({ success: false, error: 'Failed to download YouTube video' });
  }
});

app.post('/api/download/instagram', async (req, res) => {
  const { url } = req.body;
  try {
    const response = await axios.get(`https://www.instagram.com/p/${url}/?__a=1`);
    if (response.data && response.data.graphql && response.data.graphql.shortcode_media) {
      const videoUrl = response.data.graphql.shortcode_media.video_url;
      res.json({ success: true, url: videoUrl });
    } else {
      throw new Error('Failed to retrieve video URL');
    }
  } catch (error) {
    console.error(error);
    res.status(500).json({ success: false, error: 'Failed to download Instagram reel' });
  }
});

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
