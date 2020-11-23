
const mongoose = require('mongoose');
const passport = require('passport');
const LocalStrategy = require('passport-local').Strategy;
const {connection} = require('./usersdb');
const User = connection.models.User;
const { validPassword } = require('./../utils/usersUtil');


// passport middleware
passport.use(
    new LocalStrategy((username, password, done) => {
        User.findOne({username:username})
            .then((user)=>{
                if(!user) { return done(null,false)}

                const isValid = validPassword(password, user.hash, user.salt);

                if(isValid){
                    return done(null,user);
                } else {
                    return done(null,false);
                }
            })
            .catch((err)=>{
                done(err);
            })
    })
);


passport.serializeUser((user, done) => done(null, user.id));

// might have bug with the id parameter
passport.deserializeUser((userId, done) => {
    User.findById(userId)
        .then((user)=>{
            done(null,user)
        })
        .catch((err)=>{
            done(err);
        })
});


