// Basic Requirements
const express = require('express');
const exphbs = require('express-handlebars');
require('dotenv').config();
PORT = process.env.PORT; 

// App
const app = express();
app.use(express.static('public'));

// DB
require('./data/reddit-db');

// Middleware
app.engine('handlebars', exphbs.engine({ defaultLayout: 'main' }));
app.set('view engine', 'handlebars');
app.set('views', './views');
app.use(express.json());
app.use(express.urlencoded({ extended: false }));

// Controllers
require('./controllers/posts')(app)

// Server
app.listen(PORT);
console.log('Server is running on port 3002');

// Export app for testing
module.exports = app;