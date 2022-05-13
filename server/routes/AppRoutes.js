import express from 'express';

const AppRouter = express.Router();


AppRouter.get("/", async(req,res)=>{
    try {
        res.status(200).json({success:true,message:"server working..."})
    } catch (error) {
        res.status(500).json({success:false,message:error.message})
    }
})

AppRouter.post("/register", async(req,res)=>{
    try {
        let { username, password } = req.body;
        if(username !== "admin"){
            res.status(200).json({success:false});
        } else {
            res.status(201).json({success:true});
        }
    } catch (error) {
        res.status(500).json({success:false});
    }
})

AppRouter.post("/login",async(req,res)=>{
    try {
        let { username, password } = req.body;
        if(username === "admin" && password === "admin"){
            res.status(200).json({success:true,message:"Secret for the admin"})
        } else {
            res.status(200).json({success:false,message:"Invalid credentials"})
        }
    } catch (error) {
        res.status(500).json({success:false,message:error.message})
    }
})

AppRouter.post("/auth",async(req,res)=>{
    try {
        let { username } = req.body;
        if(username === "admin"){
            res.status(200).json({success:true,message:"message for the admin person"})
        } else {
            res.status(200).json({success:false,message:"user not found"});
        }
    } catch (error) {
        res.status(500).json({success:false,message:error.message});        
    }
})

AppRouter.get("/logout",async(req,res)=>{
    try {
        res.status(200).json({success:true});
    } catch (error) {
        res.status(500).json({success:false});
    }
})

AppRouter.get("/isloggedin", async(req,res)=> {
    try {
        res.status(200).json({success:true});
    } catch (error) {
        res.status(500).json({success:false});        
    }
})




export default AppRouter;