const jwt = require('jsonwebtoken');

module.exports = (roles = []) => {
    return (req, res, next) => {
        const authHeader = req.headers['authorization'];

        if (!authHeader || !authHeader.startsWith('Bearer ')) {
            return res.status(401).json({ msg: 'No token, authorization denied' });
        }

        // Lấy token sau "Bearer "
        const token = authHeader.split(' ')[1];

        if (!token) return res.status(401).json({ msg: 'No token, authorization denied' });

        try {
            console.log("🔍 Received Token:", token);
            const decoded = jwt.verify(token, process.env.JWT_SECRET);
            console.log("✅ Decoded Token:", decoded);

            req.user = decoded;

            if (roles.length && !roles.includes(req.user.role)) {
                return res.status(403).json({ msg: 'Access denied' });
            }

            next();
        } catch (err) {
            console.error("❌ JWT Verification Error:", err.message);
            res.status(401).json({ msg: 'Token is not valid' });
        }
    };
};
