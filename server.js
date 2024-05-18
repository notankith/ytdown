const express = require('express');
const app = express();
const { exec } = require('child_process');

app.use(express.json());

app.post('/api/download/youtube', (req, res) => {
  const { url } = req.body;
  exec(`youtube-dl -f 'bestvideo[height<=1080]+bestaudio/best' -g ${url}`, (err, stdout, stderr) => {
    if (err) {
      console.error(err);
      res.status(500).json({ success: false, error: 'Failed to download YouTube video' });
    } else {
      const videoUrl = stdout.trim();
      res.json({ success: true, url: videoUrl });
    }
  });
});

app.post('/api/download/instagram', (req, res) => {
  const { url } = req.body;
  exec(`instagram-scraper ${url} --maximum 1 --media-metadata --media-types none`, (err, stdout, stderr) => {
    if (err) {
      console.error(err);
      res.status(500).json({ success: false, error: 'Failed to download Instagram reel' });
    } else {
      const videoUrl = stdout.trim();
      res.json({ success
