'use strict';

const express = require('express');
const superagent = require('superagent');

require(`dotenv`).config();

let app = express();
app.set('view engine','ejs');
app.use(express.static('public'));
const PORT = process.env.PORT || 3000;

app.listen(PORT, () => console.log(`app is up on ${PORT}`));
app.get('/', (req, res) => {
    res.render('pages/index');
})
