
const passport = require('passport');

const isAuth = (req,res,next) => {
    return (req.isAuthenticated()) ? next() : res.status(401).render('index',{})
}

module.exports = {
    isAuth
}