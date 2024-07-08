const jwt = require('jsonwebtoken');
const adminModel = require('../models/adminModel');

const adminAuth = async (req, res, next) => {
  const authHeader = req.header('Authorization');
  if (!authHeader || !authHeader.startsWith('Bearer ')) {
    return res.status(401).send({ error: 'Authorization token is missing or invalid.' });
  }

  const token = authHeader.replace('Bearer ', '');
  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    const admin = await adminModel.findAdminById(decoded.id);
    if (!admin) {
      return res.status(403).send({ error: 'Access denied' });
    }
    req.user = decoded;
    next();
  } catch (error) {
    res.status(401).send({ error: 'Please authenticate.' });
  }
};

module.exports = adminAuth;
