
const express = require('express');
const app = express();
const router = express.Router();
const { getHomepage, getLogin, getRegister } = require('./../controllers/usersController');
  

// scripts and styles routes
router.get('/public/styles/style.css',(req,res)=> res.sendFile(`${__dirname}/public/styles/style.css`));
router.get('/public/scripts/script.js',(req,res)=> res.sendFile(__dirname + "/public/scripts/script.js"));


// routes
// no auth needed
router.get('/',(req,res)=> getHomepage(req,res));
router.get('/login',(req,res)=> getLogin(req,res));
router.get('/register',(req,res)=> getRegister(req,res));




// error handling for bad route requests
router.use((req,res,next)=> res.status(404).render('404',{}));



module.exports = {
    router
}