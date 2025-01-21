
// const signupModel = require("../models/user");
// const bcrypt = require("bcrypt");

// const Signup = async (req, res) => {
//     const { username, email, password, contact,role } = req.body;
//     try {
//         const existingUser = await signupModel.findOne({ email });
//         if (existingUser) {
//             return res.status(400).json({ message: "User already exists" });
//         }
//         const hashPassword = await bcrypt.hash(password, 10);

//         const result = await signupModel.create({
//             username,
//             email,
//             password: hashPassword,
//             contact,
//             role
//         });

//         res.status(201).json({ message: "User signup successfully", user: result });
//     } catch (error) {
//         console.error("Error during signup:", error);
//         res.status(500).json({ message: "Something went wrong" });
//     }
// };
// module.exports = { Signup };




// ################################This is correct @@@@@@@@@@@@@@@#

const signupModel = require("../models/user");
const bcrypt = require("bcrypt");

const Signup = async (req, res) => {
    const { username, email, password, contact, role } = req.body;

    // Check for missing fields
    if (!email || !password || !username || !contact || !role) {
        return res.status(400).json({ error: "All fields are required" });
    }

    // Email validation
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(email)) {
        return res.status(400).json({ error: "Invalid email format" });
    }

    // Password validation
    const passwordRegex = /^(?=.*\d)(?=.*[A-Z])(?=.*[a-z])(?=.*[!@#$%^&*]).{8,}$/;
    if (!passwordRegex.test(password)) {
        return res.status(400).json({ error: "Invalid password format. Password must be at least 8 characters long and include an uppercase letter, a lowercase letter, a digit, and a special character." });
    }

    // Username validation (letters and optional numbers)
    const usernameRegex = /^[A-Za-z\s]+[0-9]*$/;
    if (!usernameRegex.test(username)) {
        return res.status(400).json({ error: "Invalid username format. Username should contain only letters and optionally end with numbers." });
    }

    // Contact number validation (10 digits)
    const contactRegex = /^\d{10}$/;
    if (!contactRegex.test(contact)) {
        return res.status(400).json({ error: "Invalid contact number format. Contact number must be exactly 10 digits." });
    }

    try {
        // Check if user already exists
        const existingUser = await signupModel.findOne({ email });
        if (existingUser) {
            return res.status(400).json({ message: "User already exists" });
        }

        // Hash the password
        const hashPassword = await bcrypt.hash(password, 10);

        // Create new user
        const result = await signupModel.create({
            username,
            email,
            password: hashPassword,
            contact,
            role
        });

        // Success response
        res.status(201).json({ message: "User signed up successfully", user: result });
    } catch (error) {
        console.error("Error during signup:", error);
        res.status(500).json({ message: "Something went wrong" });
    }
};

module.exports = { Signup };


// #################################################








// const signupModel = require("../models/user");
// const bcrypt = require("bcrypt");

// const Signup = async (req, res) => {
//     const { username, email, password,ConfirmPassword, contact, role } = req.body;

//     // Check for missing fields
//     if (!email || !password || !ConfirmPassword || !username || !contact || !role) {
//         return res.status(400).json({ error: "All fields are required" });
//     }

//     // Email validation
//     const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
//     if (!emailRegex.test(email)) {
//         return res.status(400).json({ error: "Invalid email format" });
//     }

//     // Password validation
//     const passwordRegex = /^(?=.*\d)(?=.*[A-Z])(?=.*[a-z])(?=.*[!@#$%^&*]).{8,}$/;
//     if (!passwordRegex.test(password)) {
//         return res.status(400).json({ error: "Invalid password format. Password must be at least 8 characters long and include an uppercase letter, a lowercase letter, a digit, and a special character." });
//     }

//     // Username validation (letters and optional numbers)
//     const usernameRegex = /^[A-Za-z\s]+[0-9]*$/;
//     if (!usernameRegex.test(username)) {
//         return res.status(400).json({ error: "Invalid username format. Username should contain only letters and optionally end with numbers." });
//     }

//     // Contact number validation (10 digits)
//     const contactRegex = /^\d{10}$/;
//     if (!contactRegex.test(contact)) {
//         return res.status(400).json({ error: "Invalid contact number format. Contact number must be exactly 10 digits." });
//     }

//     try {
//         // Check if user already exists
//         const existingUser = await signupModel.findOne({ email });
//         if (existingUser) {
//             return res.status(400).json({ message: "User already exists" });
//         }

//         // Hash the password
//         const hashPassword = await bcrypt.hash(password, 10);

//         // Create new user
//         const result = await signupModel.create({
//             username,
//             email,
//             password: hashPassword,
//             ConfirmPassword,
//             contact,
//             role
//         });

//         // Success response
//         res.status(201).json({ message: "User signed up successfully", user: result });
//     } catch (error) {
//         console.error("Error during signup:", error);
//         res.status(500).json({ message: "Something went wrong" });
//     }
// };

// module.exports = { Signup };


