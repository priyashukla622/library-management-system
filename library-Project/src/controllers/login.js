// const signupModel = require("../models/user");
// const bcrypt = require("bcrypt");
// const jwt=require('jsonwebtoken')
// // SECRET_KEY="priya shukla";
// const login=async(req,res)=>{
//     const{email,password}=req.body
//     try{
//         const existingUser=await signupModel.findOne({email:email})
//         console.log(existingUser)
//         if(!existingUser){
//             return res.status(404).json({message:"User not found"});
//         }
//         const matchPassword=await bcrypt.compare(password, existingUser.password);
//         if(!matchPassword){
//             return res.status(404).json({message:"password does not match"})
//         }
//         const token=jwt.sign({email:existingUser.email,id:existingUser._id}, process.env.SECRET_KEY);
//         // const token=jwt.sign({ id:existingUser._id},  SECRET_KEY);
//         // const token = jwt.sign({ userId: user._id }, 'priyashuklanavgurukul', { expiresIn: '1h' }); // Set expiration time to 1 hour

//         res.status(200).json({user:existingUser,token:token}) 
//     }catch(error){
//         console.log(error)
//         res.status(500).json({message:"Somethingn went wrong"});
//     }
// };
// module.exports={login}

// ############################################################






const signupModel = require("../models/user");
const bcrypt = require("bcrypt");
const jwt = require('jsonwebtoken');

const login = async (req, res) => {
    const { email, password } = req.body;
    try {
        console.log("Login attempt for email:", email);
        const existingUser = await signupModel.findOne({ email: email});
        console.log(existingUser, "hello")
        if (!existingUser) {
            console.log("User not found");
            return res.status(404).json({ message: "User not found" });
        }

        const matchPassword = await bcrypt.compare(password, existingUser.password);
        if (!matchPassword) {
            console.log("Incorrect password for user:", email);
            return res.status(400).json({ message: "Incorrect password" });
        }
        // Generate JWT Token
        const token = jwt.sign(
            { email: existingUser.email, id: existingUser._id },
            process.env.SECRET_KEY,
            { expiresIn: '1h' }
        );
        console.log("Login successful for user:", email);
        res.status(200).json({ user: existingUser, token: token });
    } catch (error) {
        console.log("Error during login process:", error.message);
        res.status(500).json({ message: "Something went wrong", error: error.message });
    }
};
module.exports = { login };




