import express from 'express';
import { loginUser, registerUser } from '../controllers/userController.js';
import { isAuth } from '../utils/auth.js';

const router = express.Router();

router.get('/',(req,res)=> res.status(200).json({success:true,payload:'server is working'}));
router.post('/register', registerUser);
router.post('/login',loginUser);
router.get('/dashboard',isAuth,(req,res)=>res.status(200).json({success:true,payload:'dashboard'}));

export default router;