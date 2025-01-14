
const signupModel = require("../models/user");
const memberModel = require("../models/memberScheema");
const bcrypt = require('bcrypt'); 

const addUser = async (req, res) => {
  const data = {
    username: req.body.username,
    email: req.body.email,
    password: req.body.password,
    contact: req.body.contact, 
  };

  if (!data.username || !data.email || !data.password || !data.contact) {
    console.log(data);
    return res.status(400).json("Please send proper member data");
  }

  try {
    // Check if the user has signed up
    const existingSignupUser = await signupModel.findOne({ email: data.email });
    if (!existingSignupUser) {
      return res.status(404).json({ message: "User must sign up first" });
    }

    // Check if the user already exists in the memberModel
    const existingMemberUser = await memberModel.findOne({ email: data.email });
    if (existingMemberUser) {
      return res.status(409).json({ message: "User already exists as a member" });
    }

    // Hash the password before saving
    const hashedPassword = await bcrypt.hash(data.password, 10);
    data.password = hashedPassword;

    const newUser = await memberModel.create(data);
    res.status(201).json({ message: "User added successfully", data: newUser });
    console.log("User added successfully");

  } catch (error) {
    res.status(500).json({ message: "Something went wrong", error: error.message });
  }
};

module.exports = { addUser };