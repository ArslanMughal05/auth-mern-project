// const jwt = require('jsonwebtoken');

// const ensureAuthenticated = (req, res, next) => {
//     const auth = req.headers['authorization'];
//     if(!auth) {
//         return res.status(403)
//             .json({ message: 'Unauthorized, JWT token is require'});
//     }
//     try {
//         const decoded = jwt.verify(auth, process.env.JWT_SECRET);
//         req.user = decoded;
//         next();
//     } catch (err) {
//         return res.status(403)
//             .json({ message: 'Unauthorized, JWT token wrong or expired'});
//     }
// }

// module.exports = ensureAuthenticated;

const jwt = require('jsonwebtoken');

const ensureAuthenticated = (req, res, next) => {
    const authHeader = req.headers['authorization'];

    // Check if token exists
    if (!authHeader) {
        return res.status(403).json({ message: 'Unauthorized, JWT token is required' });
    }

    // Remove "Bearer " from token if it's there
    const token = authHeader.startsWith('Bearer ') ? authHeader.split(' ')[1] : authHeader;

    try {
        const decoded = jwt.verify(token, process.env.JWT_SECRET);
        req.user = decoded; // attaching user to request
        next();
    } catch (err) {
        return res.status(403).json({ message: 'Unauthorized, JWT token is wrong or expired' });
    }
};

module.exports = ensureAuthenticated;