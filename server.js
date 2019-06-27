const express = require("express");
const bodyParser = require("body-parser");
const Sequelize = require("sequelize");


const app = express();
const port = 8000;

// parse application/json
app.use(bodyParser.json());
//parse application/x-www-form-urlencoded
app.use(bodyParser.urlencoded({ extended: true }));
//Make sure mamp is on and take conf from here http://localhost:8888/MAMP/?language=English
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
  
  
    
app.get("/", function(req, res){
    res.json({ message: 'Express is up!' });
});

// get all users
app.get('/users', function(req, res) {
    getAllUsers().then(user => res.json(user)); 
  });
  // register route
  app.post('/register', function(req, res, next) {
    const { name, password } = req.body;
    createUser({ name, password }).then(user =>
      res.json({ user, msg: 'account created successfully' })
    );
  });


app.listen(port, function(){
    console.log(`Server is running on port ${port}`);
});
