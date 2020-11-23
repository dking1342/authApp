
// db setup
const mongoose = require('mongoose');
const {connection} = require('./../config/usersdb');
const User = connection.models.User;

const { genPassword } = require('./../utils/usersUtil');

// custom model middleware
const createUser = (credentials) => {
    return new Promise((resolve,reject)=>{
        let { username, password } = credentials;
        let pw = genPassword(password);
        let { salt, hash } = pw;

        User.create({username, hash, salt},(err,user)=>{
            if(err){
                reject({msg:"error",error:err});
            } else {
                resolve(user);
            }
        })
    }).then(res => {
        return res;
    }).catch(err => {
        return err;
    });
}

const findAuth = (username,password) => {
    return new Promise((resolve,reject)=>{

        User.where({username:username}).findOne((err,user)=>{
            if(err){
                // reject(done(null,false));
                reject({msg:'error',status:'mongo error', user:null});
            } else if(!user){
                // reject(done(null,false));
                reject({msg:'error',status:'no user found',user:null})
            } else {
                const isValid = validPassword(password, user.hash, user.salt);
                
                if(isValid){
                    // return done(null,user);
                    resolve({msg:'success', status:'logged in',user:user})
                } else {
                    // return done(null, false);
                    resolve({msg:'error',status:'password incorrect',user:user});
                }
            }
        })
    }).then(res => {
        return res;
    }).catch(err => {
        return err;
    })
}

module.exports = {
    createUser,
    findAuth
}