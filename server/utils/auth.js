import dotenv from 'dotenv';
import jwt from 'jsonwebtoken';

dotenv.config();
const SECRET_TOKEN = process.env.SECRET_TOKEN;

export const isAuth = async (req,res,next) => {
    let errors = {};
    let auth = {};
    const authorization = req.headers.authorization;

    if(authorization){
        const token = authorization.split('Bearer ')[1];
        if(token){
            try {
                const payload = jwt.verify(token,SECRET_TOKEN);
                auth.data = payload;
            } catch (error) {
                errors.general = 'Invalid/Expired token'
            }
        } else {
            errors.general = 'Authentication token must be formatted properly';
        }
    } else {
        errors.general = 'Correct header must be provided';
    }

    if(Object.keys(errors).length){
        res.status(403).json({success:false,payload:errors.general});
    }
    req.user = auth.data.username;
    next();
}