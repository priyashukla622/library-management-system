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