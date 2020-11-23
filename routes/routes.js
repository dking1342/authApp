
const express = require('express');
const router = express.Router();
const passport = require('passport');
const { isAuth } = require('./authMiddleware');

const { getHomepage, getLogin, postLogin, getRegister, makeRegister, getLogout, getLanding } = require('./../controllers/usersController');

// routes
router.get('/', (req,res)=> getHomepage(req,res));

router.route('/login')
    .get((req,res)=> getLogin(req,res))
    .post(passport.authenticate("local",{failureRedirect:"/",successRedirect:"/landing"}))

router.route('/register')
    .get((req,res)=> getRegister(req,res))
    .post((req,res)=> makeRegister(req,res))

router.route('/landing')
    .get( isAuth, (req,res)=> getLanding(req,res))

router.route('/logout')
    .get((req,res) => getLogout(req,res))



// error handling for bad route requests
router.use((req,res,next)=> res.status(404).render('404',{}));

module.exports = {
    router
}