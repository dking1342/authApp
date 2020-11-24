
const express = require('express');
const router = express.Router();
const passport = require('passport');

const { getHomepage, getLogin, getFailedLogin,getFailedRegister, getRegister, makeRegister, getLogout, getLanding, getAbout, getStrategies } = require('./../controllers/usersController');

// routes with no need of authentication
router.get('/', (req,res)=> getHomepage(req,res))

router.route('/login')
    .get((req,res)=> getLogin(req,res))
    .post(passport.authenticate("local",{failureRedirect:"/login-failure",successRedirect:"/landing"}))

router.route('/register')
    .get((req,res)=> getRegister(req,res))
    .post(makeRegister, passport.authenticate("local",{failureRedirect:"/register-failure",successRedirect:"/landing"}))

// routes that are redirects
router.get('/login-failure', (req,res)=> getFailedLogin(req,res));
router.get('/register-failure', (req,res)=> getFailedRegister(req,res));

// routes needing authentication
router.get('/landing',  (req,res) => getLanding(req,res));
router.get('/about',  (req,res) => getAbout(req,res));
router.get('/strategies',  (req,res) => getStrategies(req,res));
router.get('/logout', (req,res,next)=>getLogout(req,res,next))




// error handling for bad route requests
router.use((req,res)=> {
    let user = req.isAuthenticated();
    res.status(404).render('404',{user});
});

module.exports = {
    router
}