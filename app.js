//this is the server-side js
//You will create an Express server (app.js) that will handle requests and responses.
//This server will act as a middleman between your front-end (HTML + JavaScript) and the external API.
//The server will receive a request from the client-side JavaScript, call the external API to get the weather data, and then send that data back to the client-side.


const express = require('express');
const bodyParser = require('body-parser');

const app = express();
const port = 3000;

app.use(express.json());

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));