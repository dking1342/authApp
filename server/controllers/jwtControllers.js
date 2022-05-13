import bcrypt from 'bcryptjs';
import JWT from '../models/jwtModels.js';
import { createAccessToken, createRefreshToken } from '../utils/auth.js';

// DESC     Gets the home route
// ROUTE    GET /api/
// ACCESS   Public
export const getHome = (req,res) => {
    res.status(200).json({success:true,payload:'Response sent'})
}

// DESC     Gets all of the registered
// ROUTE    GET /api/users
// ACCESS   Public
export const getUsers = async (req,res) => {
    try {
        const users = await JWT.find({});
        res.status(200).json({success:true,count:users.length,payload:users});
    } catch (error) {
        res.status(400).json({success:false,payload:error.message});
    }
}

// DESC     Registers a user to the db
// ROUTE    POST /api/register
// ACCESS   Public
export const registerUser = async (req,res) => {
    try {
        let { email, password } = req.body;
        let existingUser = await JWT.findOne({email:email});

        if(existingUser){
            res.status(400).json({success:false,payload:'User already exists'});
        } else {
            const hash = bcrypt.hashSync(password,10);
            let registeredUser = await JWT.create({email,password:hash});
            res.status(201).json({success:true,payload:registeredUser});
        }
    } catch (error) {
        res.status(400).json({success:false,payload:'Bad Request'});        
    }
}

// DESC     Deletes all users
// ROUTE    DELETE /api/users
// ACCESS   Public
export const removeUsers = async (req,res) => {
    try {
        await JWT.deleteMany({});
        res.status(200).json({success:true,payload:'All users removed'});
    } catch (error) {
        res.status(400).json({success:false,payload:error.message})
    }
}

// DESC     Logs in the user
// ROUTE    POST /api/login
// ACCESS   Public
export const loginUser = async (req,res) => {
    try {
        const { email, password } = req.body;
        const checkUser = await JWT.find({email:email});
        if(checkUser.length){
            let { email ,password: pw, _id:id} = checkUser[0];
            if(bcrypt.compareSync(password,pw)){
                const accesstoken = createAccessToken(checkUser);
                const refreshtoken = createRefreshToken(checkUser);

                let newTokenUser = {
                    _id:id,
                    email,
                    password:pw,
                    token:accesstoken
                }
                let tokenUser = await JWT.findOneAndUpdate({_id:id},newTokenUser,{new:true,useFindAndModify:false});
                let responseUser = {
                    _id: tokenUser._id,
                    email: tokenUser.email,
                    token: tokenUser.token
                }
                res.status(200).json({success:true,payload:responseUser});
            } else {
                res.status(400).json({success:false,payload:'Incorrect password'});
            }
        } else {
            res.status(400).json({success:false,payload:'User does not exist'});
        }

    } catch (error) {
        res.status(400).json({success:false,payload:'Bad Request'})
    }
}

// DESC     Test page for auth
// ROUTE    POST /api/test
// ACCESS   Private
export const testRoute = (req,res) => {
    res.status(200).json({success:true,payload:'Home page'});
}

// DESC     Logs out the user
// ROUTE    POST /api/logout
// ACCESS   Private
export const logout = (req,res) => {
    res.clearCookie('');
    req.user = '';
    res.status(200).json({success:true,payload:'Logged out'});
}

