const jwt = require('jsonwebtoken');

const verifyToken = (req, res, next) => {
    // 1. Get token from header (format: "Authorization: <token>")
    // In our frontend code we send just the token, or "Bearer <token>"?
    // The frontend code: 'Authorization': token
    // So we read it directly.

    const token = req.header('Authorization');

    if (!token) {
        return res.status(401).json({ error: "Access Denied. No token provided." });
    }

    try {
        // 2. Verify the token
        const verified = jwt.verify(token, process.env.JWT_SECRET || "secretKEY123");

        // 3. Attach user to request object
        req.user = verified;

        next(); // Continue to the next middleware/route
    } catch (err) {
        res.status(400).json({ error: "Invalid Token" });
    }
};

module.exports = verifyToken;
