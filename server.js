
// npm packages
const express = require("express");
const path = require('path');
const bodyParser = require('body-parser');
const session = require('express-session');
const cors = require('cors');
const mongoose = require('mongoose');
const errorhandler = require('errorhandler');

// config mongoose's promise to global promise
mongoose.promise = global.Promise;

//models and schemas
require('./models/Users');
require('./config/passport');

// config isproduction variable
const isProduction = process.env.NODE_ENV === 'production';

// init app
const app = express();

// config the app
app.use(cors());
app.use(require('morgan')('dev'));
app.use(bodyParser.urlencoded({extended:false}));
app.use(bodyParser.json());
app.use(express.static("public"));
app.use(session({secret:'passport-tutorial',cookie:{maxAge:60000},resave:false,saveUninitialized:false}));


if(!isProduction){
  app.use(errorhandler());
}

// config mongoose
mongoose.connect('mongodb://localhost/passport-tutorial',{useUnifiedTopology:true,useNewUrlParser:true});
mongoose.set('debug',true);


// error handler and middleware
if(!isProduction){
  app.use((err,req,res)=>{
    res.status(err.status || 500);

    res.json({
      errors:{
        message:err.message,
        error:err,
      }
    })
  })
}

app.use((err,req,res)=>{
  res.status(err.status || 500);

  res.json({
    errors:{
      message: err.message,
      error:{},
    }
  })
})


// listen for requests :)
const port = parseInt(process.env.PORT) || 3000;
app.listen(port,()=> console.log(`Listening on port ${port}`));
