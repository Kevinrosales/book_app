DROP DATABASE IF EXISTS books;
CREATE DATABASE books;

\c books;

CREATE TABLE saved (
    id SERIAL PRIMARY KEY,
    author VARCHAR(255),
    title VARCHAR(255),
    isbn VARCHAR(255),
    image_url TEXT,
    description TEXT,
    bookshelf VARCHAR(255)
);