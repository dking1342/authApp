
const express = require('express');
const router = express.Router();
const passport = require('passport');
const { isAuth } = require('./authMiddleware');

const { getHomepage, getLogin, getFailedLogin,getFailedRegister, getRegister, makeRegister, getLogout, getLanding } = require('./../controllers/usersController');

// routes
router.get('/', (req,res)=> getHomepage(req,res));

router.route('/login')
    .get((req,res)=> getLogin(req,res))
    .post(passport.authenticate("local",{failureRedirect:"/login-failure",successRedirect:"/landing"}))

router.route('/login-failure')
    .get((req,res)=> getFailedLogin(req,res))

router.route('/register-failure')
    .get((req,res)=> getFailedRegister(req,res))

router.route('/register')
    .get((req,res)=> getRegister(req,res))
    .post((req,res)=> makeRegister(req,res))

router.route('/landing')
    .get( isAuth, (req,res)=> getLanding(req,res))

router.route('/logout')
    .get( isAuth, (req,res) => getLogout(req,res))



// error handling for bad route requests
router.use((req,res,next)=> res.status(404).render('404',{}));

module.exports = {
    router
}