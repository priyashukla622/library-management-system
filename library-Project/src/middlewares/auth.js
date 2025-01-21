// const jwt = require('jsonwebtoken');
// const authMiddleware = (req, res, next) => {
//     const token = req.headers['authorization'];
//     if (!token) {
//         return res.status(401).json({ message: "No token provided" });
//     }
//     try {
//         const decoded = jwt.verify(token, 'priyashuklanavgurukul'); 
//         req.userId = decoded.userId;
//         next();
//     } catch (error) {
//         console.error(error);
//         return res.status(401).json({ message: "Invalid or expired token" });
//     }
// };
// module.exports = authMiddleware;



const jwt = require('jsonwebtoken');

const authMiddleware = (req, res, next) => {
    const token = req.headers['authorization']?.split(' ')[1]; // Extract token from "Bearer token" format

    if (!token) {
        return res.status(401).json({ message: "No token provided" });
    }

    try {
        // Decode and verify the token
        const decoded = jwt.verify(token, 'priyashuklanavgurukul'); // Replace 'your-secret-key' with your actual secret key
        req.userId = decoded.id;
        next(); // Token is valid, proceed with request handling
    } catch (error) {
        console.error(error);
        return res.status(401).json({ message: "Invalid or expired token" });
    }
};

module.exports = authMiddleware;

