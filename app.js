'use strict'

const http = require('http')

const hostname = 'localhost';
const port = 3005;

const express = require('express');
const session = require('express-session');
const app = express();

// (middle ware for security)
const helmet = require('helmet');
app.use(helmet());
// end
// New form data to post route // (middle ware for logging)
const morgan = require('morgan');
const logger = morgan('tiny');
app.use(logger);
// end
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(express.static('Public'));
// to create form data //

const es6Renderer = require('express-es6-template-engine');

app.engine('html', es6Renderer);
app.set('views', './views');
app.set('view engine', 'html');

app.use(session({
    secret: 'get rad!',
    resave: false,
    saveUninitialized: false,
    is_logged_in: false,
}))

const server = http.createServer(app);

server.listen(port, hostname, () => {
    console.log(`Server is running on http://${hostname}:${port}`);
});

const rootController = require('./routes/index');
const userController = require('./routes/users')


app.use('/', rootController);
app.use('/users', userController)

