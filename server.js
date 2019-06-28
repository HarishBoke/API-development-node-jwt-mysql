const express = require("express");
const bodyParser = require("body-parser");
const Sequelize = require("sequelize");
//Todo:: password encription
const bcrypt = require('bcrypt');
// import passport and passport-jwt modules
const jwt = require('jsonwebtoken');
const passport = require('passport');
const passportJWT = require('passport-jwt');

const app = express();
const port = 8000;

// parse application/json
app.use(bodyParser.json());
//parse application/x-www-form-urlencoded
app.use(bodyParser.urlencoded({ extended: true }));
//Make sure mamp is on and take conf from here http://localhost:8888/MAMP/?language=English



////============================

// ExtractJwt to help extract the token
let ExtractJwt = passportJWT.ExtractJwt;
// JwtStrategy which is the strategy for the authentication
let JwtStrategy = passportJWT.Strategy;
let jwtOptions = {};
jwtOptions.jwtFromRequest = ExtractJwt.fromAuthHeaderAsBearerToken();
jwtOptions.secretOrKey = 'wowwow';

// lets create our strategy for web token
let strategy = new JwtStrategy(jwtOptions, function(jwt_payload, next) {
    console.log('payload received', jwt_payload);
    let user = getUser({ id: jwt_payload.id });
    if (user) {
      next(null, user);
    } else {
      next(null, false);
    }
  });
  // use the strategy
  passport.use(strategy);

  app.use(passport.initialize());

//==============================================



// initialize an instance of Sequelize
const sequelize = new Sequelize({
    database: 'social_app',
    username: 'root',
    password: 'root',
    dialect: 'mysql',
     host: 'localhost',
     port: '8889',
     socket: 'Applications/MAMP/tmp/mysql/mysql.sock'

  });
  // check the databse connection
  sequelize.authenticate()
    .then(() => console.log('Connection has been established successfully.'))
    .catch(err => console.error('Unable to connect to the database:', err));

// create user model
const User = sequelize.define('user', {
    name: {
      type: Sequelize.STRING,
    },
    password: {
      type: Sequelize.STRING,
    },
  });
  // create table with user model
  User.sync()
    .then(() => console.log('Oh yeah! User table created successfully'))
    .catch(err => console.log('BTW, did you enter wrong database credentials?'));
  
  
  // create some helper functions to work on the database
    const createUser = async ({ name, password }) => { 
      return await User.create({ name, password });
    };
    const getAllUsers = async () => {
      return await User.findAll();
    };
    const getUser = async obj => {
      return await User.findOne({
       where: obj,
        });
    };
    
  

//DB connection
app.get("/", function(req, res){
    res.json({ message: 'Express is up!' });
});

// protected route:: Check authorisation
app.get('/protected', passport.authenticate('jwt', { session: false }), function(req, res) {
    res.json({ msg: 'Congrats! You are seeing this because you are authorized'});
});

// login route
app.post('/login', async function(req, res, next) { 
    const { name, password } = req.body;
    if (name && password) {
      // we get the user with the name and save the resolved promise returned
      let user = await getUser({ name });
      if (!user) {
        res.status(401).json({ msg: 'No such user found', user });
      }
     if (user.password === password) {
        // from now on we’ll identify the user by the id and the id is
         // the only personalized value that goes into our token
        let payload = { id: user.id };
        let token = jwt.sign(payload, jwtOptions.secretOrKey);
        res.json({ msg: 'ok', token: token });
      } else {
        res.status(401).json({ msg: 'Password is incorrect' });
      }
    }
  });
  
// get all users
//NOTE:: by adding passport.authenticate('jwt', { session: false }), and passing Authentication: Bearer token; as header will be secure request
  app.get('/users', passport.authenticate('jwt', { session: false }), function(req, res) {
    getAllUsers().then(user => res.json(user)); 
  });
  app.get('/user/:id', passport.authenticate('jwt', {session: false}), function(req, res){
const {id} = req.body;
        getUser(req.params.id).then(user => res.json(user));
  });
  // register route
  app.post('/register', passport.authenticate('jwt', { session: false }), function(req, res, next) {
    const { name, password } = req.body;
    createUser({ name, password }).then(user =>
      res.json({ user, msg: 'account created successfully' })
    );
  });


app.listen(port, function(){
    console.log(`Server is running on port ${port}`);
});
