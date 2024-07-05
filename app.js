// Import required modules
const express = require('express');
const axios = require('axios');
const path = require('path');
const cors = require('cors');
const dotenv = require('dotenv');

// Load environment variables from .env file
dotenv.config();

// Create an instance of express
const app = express();
const PORT = process.env.PORT || 3000;

// Middleware to serve static files
app.use(express.static(path.join(__dirname, 'public')));
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Implementing CORS
const corsOptions = {
   origin: '*', 
   credentials: true, // access-control-allow-credentials:true
   optionSuccessStatus: 200,
};
app.use(cors(corsOptions));

// Route to serve the index.html
app.get('/', (req, res) => {
  res.sendFile(path.join(__dirname, 'public', 'index.html'));
});

// API route
app.post('/search', async (req, res) => {
  const query = req.body.query;
  const options = {
    method: 'GET',
    url: 'https://shazam.p.rapidapi.com/search',
    params: { term: query, locale: 'en-US', offset: '0', limit: '5' },
    headers: {
      'x-rapidapi-key': process.env.SHAZAM_API_KEY,
      'x-rapidapi-host': 'shazam.p.rapidapi.com'
    }
  };

  try {
    const response = await axios.request(options);
    if (response.status === 200) {
      const songs = response.data.tracks.hits.map(hit => ({
        track: hit.track.title,
        artist: hit.track.subtitle
      }));
      res.status(200).json(songs);
    } else {
      res.status(response.status).json({ error: `API responded with status code ${response.status}` });
    }
  } catch (error) {
    console.error('Error fetching data from Shazam API:', error.message);
    res.status(500).json({ error: 'Error fetching data from Shazam API' });
  }
});

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
