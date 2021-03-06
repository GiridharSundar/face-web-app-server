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
    connectionString : process.env.DATABASE_URL,
    ssl: {
    	rejectUnauthorized: false
  	},
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

app.post('/imageurl' , (req,res) => {image.handleApiCall(req, res)});

/// Image
app.put('/image', (req, res) => {image.handleImage(req, res, db)} );



app.listen(process.env.PORT || 3000, ()=> {console.log('app is running on port 3000')} );