import dotenv from 'dotenv';
import express from 'express';
import cors from 'cors';
import connectdb from './config/mongodb.js';
import jwtRouter from './routes/jwtRoutes.js';
import cookieParser from 'cookie-parser';

// dotenv init
dotenv.config();

// express middleware
const app = express();
const PORT = process.env.PORT || 5000;

// global middleware
app.use(express.json());
app.use(express.urlencoded({extended:true}));
app.use(cookieParser());
app.use(cors({
    origin:'http://localhost:3000',
    credentials:true
}));

// routes init
app.use('/api',jwtRouter);

// mongodb init
connectdb();

// server init
app.listen(PORT,()=> console.log('Server listening...'));