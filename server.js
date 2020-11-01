const express = require('express');
const bodyParser = require('body-parser');
const bcrypt = require('bcrypt-nodejs');
const cors = require('cors');
const knex = require('knex');

const singIn = require('./controllers/singIn')
const register = require('./controllers/register')
const image = require('./controllers/image')
const profile = require('./controllers/profile')

const db = knex(({
  client: 'pg',
  connection: {
    host : '127.0.0.1',
    user : '',
    password : '',
    database : 'facewebapp'
  }
}));

const app = express();

app.use(bodyParser.json());
app.use(cors());


app.get('/', (req,res) => {res.json('hello there')});

// Sign in
app.post('/signin', (req, res) => {singIn.handleSignIn(req, res, db, bcrypt)});

// Register
app.post('/register', (req, res) => {register.handleRegister(req, res, db, bcrypt)});


//Profile
app.get('/profile/:id', (req, res) => {profile.handleProfile(req, res, db)});


/// Image
app.put('/image', (req, res) => {image.handleImage(req, res, db)} );

app.post('/imageurl' , (req,res) => {image.handleApiCall(req, res)});

app.listen(3000, ()=> {console.log('app is running on port 3000')} );