const express = require('express');
const { engine } = require('express-handlebars');
const handlebars = require('express-handlebars');
require ('dotenv').config();
PORT = process.env.PORT;

// Register the nav partial
handlebars.create({ 
    partialsDir: ['layouts/']
  }).partialsDir = __dirname + '/layouts';

const app = express();

app.engine('handlebars', engine());
app.set('view engine', 'handlebars');
app.set('views', './views');

app.get('/', (req, res) => {
    res.render('home');
});

app.listen(PORT);
console.log('Server is running on port 3002');