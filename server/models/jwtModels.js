import mongoose from 'mongoose';

const JWTSchema = new mongoose.Schema({
    email:{
        type:String,
        required:true
    },
    password:{
        type:String,
        required:true
    },
    token:{
        type:String
    }
});

const JWT = mongoose.model('JWT',JWTSchema);
export default JWT;