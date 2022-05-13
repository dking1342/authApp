import dotenv from 'dotenv';
import express from 'express';
import cors from 'cors';

import authRouter from './routes/userRoutes.js';

dotenv.config();

const app = express();
const PORT = process.env.PORT;
app.use(express.json());
app.use(express.urlencoded({extended:true}));
app.use(cors());

app.use('/api/auth',authRouter);

app.listen(PORT,()=>console.log(`server is listening on port ${PORT}`));