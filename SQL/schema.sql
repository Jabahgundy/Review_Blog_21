CREATE TABLE rankings (
    id serial PRIMARY KEY,
    movie_rankings text NOT NULL
); 

CREATE TABLE movies (
    id serial PRIMARY KEY,
    movie_title text NOT NULL,
    movie_id integer REFERENCES rankings(id) 
);

CREATE TABLE users (
    id serial PRIMARY KEY,
    first_name text, 
    last_name text,
    email varchar(200),
    password varchar(2000)
);
 