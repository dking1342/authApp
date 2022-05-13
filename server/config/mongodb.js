import dotenv from 'dotenv';
dotenv.config();
import mongoose from 'mongoose'

const conn = process.env.MONGO_URI;
const options = {
    useNewUrlParser:true,
    useUnifiedTopology:true,
    useCreateIndex:true
}

const connectdb = () => mongoose.connect(conn,options);
export default connectdb;