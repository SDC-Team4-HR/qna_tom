// need: dotenv, express, path, morgan, cors
require('dotenv').config();
const express = require('express');
const path = require('path');
const morgan = require('morgan');
const cors = require('cors');

// convenience
const { SV_PORT } = process.env;

// give 'app' express' functionality
const app = express();

app.use(express.json());
app.use(morgan('dev'));
app.use(cors());

// serve static assets from front-end
// app.use(express.static(path.join(__dirname, '.client/dist')));

// listen on a port that's different from db
app.listen(SV_PORT);
console.log(`Server is listening at http://localhost:${SV_PORT}`);
