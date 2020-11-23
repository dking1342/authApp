
// db setup
const mongoose = require('mongoose');
const {connection} = require('./../config/usersdb');
const User = connection.models.User;

const { genPassword } = require('./../utils/usersUtil');

// custom model middleware
const createUser = (credentials) => {
    return new Promise((resolve,reject)=>{
        let { username, password } = credentials;

        let usernameRegex = /^[a-z][^\W_]{4,14}$/i;
        let passwordRegex = /^(?=[^a-z]*[a-z])(?=\D*\d)[^:&.~\s]{5,20}$/;

        // ****Explanation for username regex
        // [a-z]    the first letter
        // [^\W_]   equivalent to [a-zA-Z0-9]

        // ****Explanation for password regex
        // (?=..)    is a lookahead that don't consume characters but only check
        // (?=[^a-z]*[a-z]) check if there is at least 1 lower case letter 
        // (?=\D*\d)   check if there is at least 1 digit
        // [^:&.~\s]  a character class that exclude all the characters you don't want

        if(usernameRegex.test(username) && passwordRegex.test(password)){
            User.findOne({username:username},(err,docs)=>{
                if(err) throw err;
                if(!docs){
                    let pw = genPassword(password);
                    let { salt, hash } = pw;

                    User.create({username, hash, salt},(err,user)=>{
                        if(err){
                            reject({msg:"error",status:err});
                        } else {
                            resolve({msg:'success',status:user});
                        }
                    })
                } else {
                    reject({msg:'error',status:'user exists'})
                }
            })
        } else {
            reject({msg:'error',status:'not valid'})
        }
    }).then(res => {
        return res;
    }).catch(err => {
        return err;
    });
}


module.exports = {
    createUser,
}