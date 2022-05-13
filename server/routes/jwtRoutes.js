import express from 'express';
import { 
    getHome, 
    getUsers, 
    loginUser, 
    registerUser,
    testRoute,
    removeUsers,
    logout
} from '../controllers/jwtControllers.js';
import { isAuth } from '../utils/auth.js';

const router = express.Router();

// routes
router.get('/',getHome);
router.get('/users',getUsers);
router.post('/register',registerUser);
router.delete('/users',removeUsers);
router.post('/login',loginUser);
router.get('/test', isAuth, testRoute);
router.get('/logout',logout);


export default router;