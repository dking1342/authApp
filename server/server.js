import express from 'express';
import cors from 'cors';
import AppRouter from './routes/AppRoutes.js';

const app = express();
app.use(express.json());
app.use(express.urlencoded({extended:false}));
app.use(cors());

// routes
app.use("/api",AppRouter);

// error handler
app.use((err,req,res,next)=> res.status(500).json({message: err.message}))

const PORT = 1234;
app.listen(PORT,()=> console.log('server listening...'));