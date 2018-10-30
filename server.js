'use strict';

const express = require('express');
const superagent = require('superagent');

require(`dotenv`).config();

let app = express();
app.set('view engine','ejs');
app.use(express.urlencoded({extended:true}));
app.use(express.static('public'));
const PORT = process.env.PORT || 3000;

app.listen(PORT, () => console.log(`app is up on ${PORT}`));
app.get('/', (req, res) => {
    res.render('pages/index');
});
//+++++++++++++++BOOK SEARCH++++++++++++++++\\
app.post('/searches', searchBooks)

function searchBooks(req, res,){
    let URL = `https://www.googleapis.com/books/v1/volumes?q=`;

    if (req.body.search[1] === 'title') URL += `intitle:${req.body.search[0]}&key=${process.env.BOOKS_API_KEY}`;
    if (req.body.search[1] === 'author') URL += `inauthor:${req.body.search[0]}&key=${process.env.BOOKS_API_KEY}`;
    superagent.get(URL)
    .then(results => {
        let books = [];
        for(let i=0;i<10;i++){
            books.push(new Book(results.body.items[i]))
        }
        console.log(books);
        res.render('pages/searches/show',{data: books});
    })
}

function Book(obj) {
    this.title = obj.volumeInfo.title;
    this.author = obj.volumeInfo.authors.join(' ');
    this.image_url = obj.volumeInfo.imageLinks.thumbnail;
    this.description = obj.volumeInfo.description;
}