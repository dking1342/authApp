
const passport = require('passport');

const isAuth = (req,res,next) => {
    const unAuthPath = ['/','/login','/register'];
    console.log(unAuthPath.includes(req.path),req.session);

    // after authentication, restricts access to auth routes only
    if(req.isAuthenticated() && !unAuthPath.includes(req.path) ){
        next();
    } else {
        req.logout();
        res.redirect('/');
    }

    // before auth, restricts access of auth routes
    if(!req.isAuthenticated() && unAuthPath.includes(req.path)){
        next();
    } else {
        req.logout();
        res.redirect('/');
    }

    


}


module.exports = {
    isAuth
}