'use strict';

const express = require('express');
const superagent = require('superagent');

require(`dotenv`).config();

let app = express();
app.set('view engine','ejs');
const PORT = process.env.PORT || 3000;

app.listen(PORT, () => console.log(`app is up on ${PORT}`));