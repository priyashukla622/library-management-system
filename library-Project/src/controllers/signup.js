
const signupModel = require("../models/user");
const bcrypt = require("bcrypt");

const Signup = async (req, res) => {
    const { username, email, password, contact,role } = req.body;

    try {
        const existingUser = await signupModel.findOne({ email });
        if (existingUser) {
            return res.status(400).json({ message: "User already exists" });
        }
        // const existingContact = await signupModel.findOne({ contact });
        // if (existingContact) {
        //     return res.status(400).json({ message: "Contact number already in use" });
        // }

        const hashPassword = await bcrypt.hash(password, 10);

        const result = await signupModel.create({
            username,
            email,
            password: hashPassword,
            contact,
            role
        });

        res.status(201).json({ message: "User signup successfully", user: result });
    } catch (error) {
        console.error("Error during signup:", error);
        res.status(500).json({ message: "Something went wrong" });
    }
};
module.exports = { Signup };