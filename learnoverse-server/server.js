require('dotenv').config();
const express = require('express');
const mongoose = require('mongoose');
const axios = require('axios');
const cors = require('cors');

const app = express();
const PORT = process.env.PORT || 8050;  // Changed to 8050

// Middleware
app.use(cors());
app.use(express.json());

// MongoDB Connection
mongoose.connect(process.env.MONGODB_URI)
  .then(() => console.log('✅ Connected to MongoDB'))
  .catch(err => console.error('❌ MongoDB error:', err));

// Video Schema
const videoSchema = new mongoose.Schema({
  videoId: String
});

const Video = mongoose.model('Video', videoSchema, 'videos');

// API Route with debugging logs
app.get('/api/videos', async (req, res) => {
  console.log('Received request at /api/videos'); // Debug log to confirm route hit
  try {
    const videos = await Video.find({});
    const videoIds = videos.map(v => v.videoId).join(',');
    console.log('Video IDs from MongoDB:', videoIds);

    const response = await axios.get(
      `https://www.googleapis.com/youtube/v3/videos?id=${videoIds}&part=snippet,contentDetails&key=${process.env.YOUTUBE_API_KEY}`
    );

    console.log('YouTube API response status:', response.status);
    console.log('YouTube API response items count:', response.data.items.length);

    const enrichedVideos = (response.data.items || []).map(item => ({
      videoId: item.id,
      title: item.snippet.title,
      channelTitle: item.snippet.channelTitle,
      thumbnail: item.snippet.thumbnails.medium.url,
      duration: item.contentDetails.duration,
      description: item.snippet.description
    }));

    res.json({ success: true, videos: enrichedVideos });
  } catch (error) {
    console.error('Error in /api/videos route:', error);
    res.status(500).json({ error: error.message });
  }
});

app.listen(PORT, '0.0.0.0', () => {
  console.log(`🚀 Server running on port ${PORT}`);
  console.log('Using MongoDB URI:', process.env.MONGODB_URI);

});
