require('dotenv').config();
const express = require('express');
const hbs = require('hbs');

const app = express(); 
const port = process.env.PORT;

const cors = require('cors');

console.clear();

//hbs
app.set('view engine', 'hbs');
hbs.registerPartials( __dirname + '/views/partials');
 
//middleware
app.use( express.static('public') );


app.get('/', (req, res) => {
  res.render('sign-Up');
});


app.get('/login', (req, res) => {
  res.render('login');
});

app.get('/home', (req, res) => {
  res.render('home',{
    home: 'active',
    post:'',
    profile:''
  });
});

app.get('/post', (req, res) => {
  res.render('post',{
    home: '',
    post:'active',
    profile:''
  });
});

app.get('/profile', (req, res) => {
  res.render('profile',{
    home: '',
    post:'',
    profile:'active'
  });
});

app.get('/article', (req, res) => {
  res.render('article');
});

app.get('/*', (req, res) => {
    res.send('404 / Pagina no encontrada');
    //res.sendFile( __dirname + '/public/404.html');
});

app.listen( port, () => {
    console.log('Escuchando en el puerto:', port);
});
