const jwt = require('jsonwebtoken');

// 1. Check if User is Logged In
exports.verifyToken = (req, res, next) => {
  const token = req.header('Authorization');
  
  if (!token) return res.status(401).json({ message: 'Access Denied. No token provided.' });

  try {
    // Determine if token has "Bearer " prefix
    const tokenPart = token.startsWith('Bearer ') ? token.slice(7, token.length) : token;
    
    const verified = jwt.verify(tokenPart, process.env.JWT_SECRET);
    req.user = verified; // Add user info to the request
    next();
  } catch (err) {
    res.status(400).json({ message: 'Invalid Token' });
  }
};

// 2. Check if User is Admin
exports.isAdmin = (req, res, next) => {
  if (req.user.role !== 'admin') {
    return res.status(403).json({ message: 'Access denied. Admins only.' });
  }
  next();
};