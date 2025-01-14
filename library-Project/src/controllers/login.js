const signupModel = require("../models/user");
const bcrypt = require("bcrypt");
const jwt=require('jsonwebtoken')
// SECRET_KEY="priya shukla";
const login=async(req,res)=>{
    const{email,password}=req.body
    if(!email || !password){
        return res.status(400).json({'error':"email and password are required"})
    }
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(email)) {
      return res.status(400).json({ error: "Invalid email format" });
  
    }
    const passwordRegex = /^(?=.*\d)(?=.*[A-Z])(?=.*[a-z])(?=.*[!@#$%^&*]).{8,}$/;
    if (!passwordRegex.test(password)) {
    return res.status(400).json({ error: "Invalid password format" });
    }
    const usernameRegex = /^[A-Za-z\s]+[0-9]*$/;
  
    if (!usernameRegex.test(username)){
    return res.status(400).json({error: "Invalid username format"});
  }
    try{
        const existingUser=await signupModel.findOne({email:email})
        console.log(existingUser)
        if(!existingUser){
            return res.status(404).json({message:"User not found"});
        }
        const matchPassword=await bcrypt.compare(password, existingUser.password);
        if(!matchPassword){
            return res.status(404).json({message:"password does not match"})
        }
        const token=jwt.sign({email:existingUser.email,id:existingUser._id}, process.env.SECRET_KEY);
        // const token=jwt.sign({ id:existingUser._id},  SECRET_KEY);
        // const token = jwt.sign({ userId: user._id }, 'priyashuklanavgurukul', { expiresIn: '1h' }); // Set expiration time to 1 hour

        res.status(200).json({user:existingUser,token:token}) 
    }catch(error){
        console.log(error)
        res.status(500).json({message:"Somethingn went wrong"});
    }
};
module.exports={login}