const jwt = require('jsonwebtoken')
const User = require('../models/User')

const protect = async (req, res, next) => {
  try {
    const authHeader = req.headers.authorization || ''
    const token = authHeader.startsWith('Bearer ') ? authHeader.split(' ')[1] : null

    if (!token) {
      return res.status(401).json({ message: 'Unauthorized. Token missing.' })
    }

    const decoded = jwt.verify(token, process.env.JWT_SECRET)
    const user = await User.findById(decoded.id).select('-password')

    if (!user) {
      return res.status(401).json({ message: 'Unauthorized. User not found.' })
    }

    req.user = user
    return next()
  } catch (error) {
    return res.status(401).json({ message: 'Unauthorized. Invalid token.' })
  }
}

module.exports = { protect }
