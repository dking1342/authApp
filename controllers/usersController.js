
const passport = require('passport');
// future imports include data from models folder
const Users = require('./../models/usersModel');

// @des     Gets the homepage view
// @route   GET /
const getHomepage = (req,res) => {
    let user = req.isAuthenticated();
    res.render('index',{user});
    res.end();
}

// @des     Gets the login view
// @route   GET /login
const getLogin = (req,res) => {
    let user = req.isAuthenticated();
    res.render('login',{user});
    res.end();
}

// @des     Authenticates the user
// @route   POST /login
const postLogin = (err,req,res,next) => {
    if(err) next(err);
}

// @des     Failed login attempt
// @route   GET /login-failure
const getFailedLogin = (req,res) => {
    let user = req.isAuthenticated();
    res.render('login-failure',{user});
    res.end();
}

// @des     Failed register attempt
// @route   GET /register-failure
const getFailedRegister = (req,res) => {
    let user = req.isAuthenticated();
    res.render('register-failure',{user});
    res.end();
}

// @des     Gets the register view
// @route   GET /register
const getRegister = (req,res) => {
    let user = req.isAuthenticated();
    res.render('register',{user});
    res.end();
}

// @des     User registers to site
// @route   POST /register
const makeRegister = async (req,res,next) => {
    const credentials = req.body;
    await Users.createUser(credentials);
    next();
}

// @des     User logs out of the site/app
// @route   GET /logout
const getLogout = (req,res) => {
    req.logout();
    res.redirect('/');
}

// @des     Landing page after login success
// @route   GET /landing
const getLanding = (req,res) => {
    let user = req.isAuthenticated();
    res.render('landing',{user});
    res.end();
}

// @des     About page view
// @route   GET /about
const getAbout = (req,res) => {
    let user = req.isAuthenticated();
    res.render('about',{user});
    res.end();
}

// @des     Strategies view
// @route   GET /strategies
const getStrategies = (req,res) => {
    let user = req.isAuthenticated();
    res.render('strategies',{user});
    res.end();
}

module.exports = {
    getHomepage,
    getLogin,
    postLogin,
    getRegister,
    makeRegister,
    getLogout,
    getLanding,
    getFailedLogin,
    getFailedRegister,
    getAbout,
    getStrategies
}