import dotenv from 'dotenv';
import jwt from 'jsonwebtoken';
dotenv.config();

const ACCESS_TOKEN = process.env.ACCESS_TOKEN_SECRET;
const REFRESH_TOKEN = process.env.ACCESS_TOKEN_SECRET;

export const createAccessToken = user => {
    return jwt.sign(
        {
            _id:user._id,
            email:user.email
        },
        ACCESS_TOKEN,
        {
            expiresIn:'5m'
        }
    )
};

export const createRefreshToken = user => {
    return jwt.sign(
        {
            _id:user._id,
            email:user.email
        },
        REFRESH_TOKEN,
        {
            expiresIn:'15m'
        }
    )
};

export const isAuth = (req,res,next) => {
    const authorization = req.headers.authorization;
    if(authorization){
        const token = authorization.slice(7,);
        jwt.verify(token,ACCESS_TOKEN,(err,decode)=>{
            if(err){
                res.status(401).json({success:false,payload:'Invalid token'});
            } else {
                req.user = decode;
                next();
            }
        })
    } else {
        res.status(400).json({success:true,payload:'You need to log in'});
    }
}