//this is the server-side js
//You will create an Express server (app.js) that will handle requests and responses.
//This server will act as a middleman between your front-end (HTML + JavaScript) and the external API.
//The server will receive a request from the client-side JavaScript, call the external API to get the weather data, and then send that data back to the client-side.


const express = require('express');
const axios = require('axios');
const path = require('path');

const app = express();
const PORT = process.env.PORT || 3000;

const cors=require("cors");
const corsOptions ={
   origin:'*', 
   credentials:true,            //access-control-allow-credentials:true
   optionSuccessStatus:200,
}

app.use(cors(corsOptions))

// Middleware to serve static files
app.use(express.static(path.join(__dirname, 'public')));
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// API route
app.post('/search', async (req, res) => {
  const query = req.body.query;
  const options = {
    method: 'GET',
    url: 'https://shazam.p.rapidapi.com/search',
    params: { term: query, locale: 'en-US', offset: '0', limit: '5' },
    headers: {
      'x-rapidapi-key': 'a6af4fa86emsh19b65663a5cab58p11c3e8jsnd1161c8947b7',
      'x-rapidapi-host': 'shazam.p.rapidapi.com'
    }
  };

  try {
    const response = await axios.request(options);
    if (response.status === 200) {
      const songs = response.data.tracks.hits;
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
