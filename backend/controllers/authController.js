const bcrypt = require('bcryptjs')
const jwt = require('jsonwebtoken')
const User = require('../models/User')

const createToken = (id) =>
  jwt.sign({ id }, process.env.JWT_SECRET, {
    expiresIn: '7d',
  })

const register = async (req, res) => {
  try {
    const { fullName, email, password } = req.body

    if (!fullName || !email || !password) {
      return res.status(400).json({ message: 'Full name, email, and password are required.' })
    }

    const existing = await User.findOne({ email })
    if (existing) {
      return res.status(409).json({ message: 'Email already registered.' })
    }

    const hashedPassword = await bcrypt.hash(password, 10)
    const user = await User.create({ fullName, email, password: hashedPassword })
    const token = createToken(user._id)

    return res.status(201).json({
      token,
      user: {
        id: user._id,
        fullName: user.fullName,
        email: user.email,
      },
    })
  } catch (error) {
    return res.status(500).json({ message: 'Failed to register user.' })
  }
}

const login = async (req, res) => {
  try {
    const { email, password } = req.body
    const user = await User.findOne({ email })

    if (!user) {
      return res.status(401).json({ message: 'Invalid email or password.' })
    }

    const isMatch = await bcrypt.compare(password, user.password)
    if (!isMatch) {
      return res.status(401).json({ message: 'Invalid email or password.' })
    }

    const token = createToken(user._id)
    return res.status(200).json({
      token,
      user: {
        id: user._id,
        fullName: user.fullName,
        email: user.email,
        phone: user.phone,
        address: user.address,
      },
    })
  } catch (error) {
    return res.status(500).json({ message: 'Failed to login user.' })
  }
}

const getProfile = async (req, res) => {
  return res.status(200).json(req.user)
}

const updateProfile = async (req, res) => {
  try {
    const { fullName, phone, address } = req.body
    const user = await User.findById(req.user._id)

    user.fullName = fullName ?? user.fullName
    user.phone = phone ?? user.phone
    user.address = address ?? user.address
    await user.save()

    return res.status(200).json({
      id: user._id,
      fullName: user.fullName,
      email: user.email,
      phone: user.phone,
      address: user.address,
    })
  } catch (error) {
    return res.status(500).json({ message: 'Failed to update profile.' })
  }
}

module.exports = { register, login, getProfile, updateProfile }
