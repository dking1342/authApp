  
// npm packages
const express = require('express');
const mongoose = require('mongoose');
const session = require('express-session');
const passport = require('passport');
const crypto = require('crypto');
const { router } = require('./routes/routes');
const { connection } = require('./config/usersdb');
const MongoStore = require('connect-mongo')(session);


// general setup
require('dotenv').config();

// app and routes init
const app = express();

// init parsers
app.use(express.json());
app.use(express.urlencoded({extended:true}));

// init views engines
app.set('view engine', 'ejs');
app.use(express.static("public"));

// session setup
const sessionStore = new MongoStore({ 
  mongooseConnection: connection, 
  collection: 'sessions' 
});

app.use(session({
    secret: process.env.SECRET,
    resave: false,
    saveUninitialized: true,
    store: sessionStore,
    cookie: {
        maxAge: 86400
    }
}));

// passport authentication
require('./config/passport');
app.use(passport.initialize());
app.use(passport.session());

// regulates access based on auth and route
app.use((req,res,next)=>{

  // paths that will reject auth access
  const unAuthPath = ['/','/login','/register'];

  if(req.isAuthenticated()){

      if(!unAuthPath.includes(req.path)){
          next();
      } else {
          req.logout();
          res.redirect('/landing');
      }
  } else {

      if(unAuthPath.includes(req.path)){
          next()
      } else {
          req.logout();
          res.redirect('/');
      }
  }
});

// middleware to access the routes
app.use(router);

// server init
const PORT = 3000 || process.env.PORT;
app.listen(PORT, () => console.log(`Server running on http://localhost:${PORT}/`));
