
// future imports include data from models folder
const Users = require('./../models/usersModel');

// @des     Gets the homepage view
// @route   GET /
const getHomepage = (req,res) => {
    res.render('index',{});
    console.log('ping');
    res.end();
}

// @des     Gets the login view
// @route   GET /login
const getLogin = (req,res) => {
    res.render('login',{});
    res.end();
}

// @des     Authenticates the user
// @route   POST /login
const postLogin = (err,req,res,next) => {
    if(err) next(err);
}

// @des     Gets the register view
// @route   GET /register
const getRegister = (req,res) => {
    res.render('register',{});
    res.end();
}

// @des     User registers to site
// @route   POST /register
const makeRegister = async (req,res) => {
    const credentials = req.body;
    const user = await Users.createUser(credentials);

    console.log('controller',user);
    res.redirect('/');
    res.end();
}

// @des     User logs out of the site/app
// @route   GET /logout
const getLogout = (req,res) => {
    req.logout();
    res.redirect('/');
}

const getLanding = (req,res) => {
    res.render('landing',{});
    res.end();
}

module.exports = {
    getHomepage,
    getLogin,
    postLogin,
    getRegister,
    makeRegister,
    getLogout,
    getLanding
}