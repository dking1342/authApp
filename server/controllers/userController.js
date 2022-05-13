import {pool} from '../config/pg.js';
import bcrypt from 'bcryptjs';
import { generateToken, validateRegisterInput, validateLoginInput } from '../utils/validation.js';



export const registerUser = async (req,res) => {
    try {
        const { username, email, password, confirmPassword } = req.body;
        let { errors, valid } = validateRegisterInput(username,email,password,confirmPassword);

        if(!valid){
            res.status(401).json({success:false,payload:errors})
        }

        const user = await pool.query("SELECT * FROM users WHERE user_email = $1",[email]);

        // checks to see if user is already registered
        // no user found
        if(user.rows.length){
            res.status(401).json({success:false,payload:['user already exists']});
        }
        // checks the password is correct
        let salt = bcrypt.genSaltSync(10);
        let hash = bcrypt.hashSync(password,salt);

        let newUser = await pool.query("INSERT INTO users(user_name,user_email,user_password) VALUES($1,$2,$3) RETURNING *",[username,email,hash]);
        const token = generateToken(newUser.rows[0]);
        res.status(201).json({success:true,payload:token});

    } catch (error) {
        res.status(500).json({success:false,payload:['Bad request']});
    }
}

export const loginUser = async (req,res) => {
    try {
        const { email, password } = req.body;
        
        let { errors, valid } = validateLoginInput(email,password);

        if(!valid){
            res.status(401).json({success:false,payload:errors});
        }

        const userLog = await pool.query("SELECT * FROM users WHERE user_email = $1",[email]);

        if(Boolean(!userLog.rows.length)){
            res.status(401).json({success:false,payload:'no user found'});
        } else {
            // check if password is correct
            let isPassword = bcrypt.compareSync(password,userLog.rows[0].user_password)
            if(!isPassword){
                res.status(401).json({success:false,payload:'password incorrect'});
            } else {
                const token = generateToken(userLog.rows[0]);
                res.status(200).json({success:true,payload:token});
            }
        }
        
    } catch (error) {
        res.status(500).json({success:false,payload:'Bad request'});
    }
}