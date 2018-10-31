'use strict';

const express = require('express');
const superagent = require('superagent');
const pg = require('pg');

require(`dotenv`).config();
const client = new pg.Client(process.env.DATABASE_URL);
client.connect();
client.on('err', err => console.log(err));



let app = express();
app.set('view engine','ejs');
app.use(express.urlencoded({extended:true}));
app.use(express.static('public'));
const PORT = process.env.PORT || 3000;

app.listen(PORT, () => console.log(`app is up on${PORT}`));
app.get('/', renderHome);
app.get('/details/:id', showBook);


function handleError(res, error) {
  console.log(error);
  res.render('pages/error', {err: error})
}

//----------------HOME PAGE----------------\\
function renderHome(req, res) {
  client.query(`SELECT * FROM saved`)
    .then(results => {
      res.render('pages/index.ejs', {data: results.rows});
    })
}

//+++++++++++++++BOOK SEARCH++++++++++++++++\\
app.post('/searches', searchBooks)

function searchBooks(req, res){
  let URL = `https://www.googleapis.com/books/v1/volumes?q=`;

  if (req.body.search[1] === 'title') URL += `intitle:${req.body.search[0]}&key=${process.env.BOOKS_API_KEY}`;
  if (req.body.search[1] === 'author') URL += `inauthor:${req.body.search[0]}&key=${process.env.BOOKS_API_KEY}`;
  superagent.get(URL)
    .then(results => {
      let books = [];
      if(results.body.items) {
        for(let i=0;i<10;i++){
          books.push(new Book(results.body.items[i]))
        }
        // console.log(books);
        res.render('pages/searches/show',{data: books});
      } else {
        handleError(res, 'No results returned');
      }
    })
    .catch( err => handleError(res, err));
}

function Book(obj) {
  this.title = obj.volumeInfo.title ? obj.volumeInfo.title : 'No Title Available';
  this.author = obj.volumeInfo.authors ? obj.volumeInfo.authors.join(', ') : 'Unknown Author';
  this.image_url = obj.volumeInfo.imageLinks.thumbnail ? obj.volumeInfo.imageLinks.thumbnail : '';
  this.description = obj.volumeInfo.description ? obj.volumeInfo.description : 'No description avialable';
  this.isbn = obj.volumeInfo.industryIdentifiers ? 'ISBN: ' + obj.volumeInfo.industryIdentifiers[0].identifier : 'ISBN not provided';
}

//---------------Modify books----------------\\

function showBook(req, res) {
  console.log(req.params.id);
  client.query(`SELECT * FROM saved WHERE id=${req.params.id};`)
    .then(results => {
      console.log(results.rows[0]);
      res.render('./pages/books/detail.ejs', {data: results.rows[0]})
    })
}
