const express = require('express');
const morgan = require('morgan');
const path = require('path');
const cors = require('cors');
const cookieParser  = require('cookie-parser');
require('dotenv').config();

const server = express();
require('./config/db')

//Configuration
server.set('port', process.env.PORT || 8080);
server.set('view engine', 'pug');
server.set('views', path.join(__dirname, 'views'));

// Middlewares
server.use(cookieParser())
server.use(morgan('dev'));
server.use(cors());
server.use(express.urlencoded({ extended: true }));
server.use(express.json());

//Static files
server.use(express.static(path.join(__dirname, 'views/public')));

// Routes
server.use('/', require('./routes'));

server.use((req, res) => {
  res.status(404).render('404');
});

server.listen(server.get('port'), () => {
  console.log(`Server on port ${server.get('port')}`);
});
