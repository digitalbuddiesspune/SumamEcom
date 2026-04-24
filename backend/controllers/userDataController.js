const User = require('../models/User')

const getCart = async (req, res) => {
  return res.status(200).json(req.user.cart || [])
}

const addToCart = async (req, res) => {
  try {
    const { productId, title = '', price = 0, quantity = 1, image = '' } = req.body

    if (!productId) {
      return res.status(400).json({ message: 'productId is required.' })
    }

    const user = await User.findById(req.user._id)
    const existing = user.cart.find((item) => item.productId === productId)

    if (existing) {
      existing.quantity += Number(quantity) || 1
    } else {
      user.cart.push({ productId, title, price, quantity, image })
    }

    await user.save()
    return res.status(200).json(user.cart)
  } catch (error) {
    return res.status(500).json({ message: 'Failed to update cart.' })
  }
}

const removeFromCart = async (req, res) => {
  try {
    const { productId } = req.params
    const user = await User.findById(req.user._id)
    user.cart = user.cart.filter((item) => item.productId !== productId)
    await user.save()
    return res.status(200).json(user.cart)
  } catch (error) {
    return res.status(500).json({ message: 'Failed to remove item from cart.' })
  }
}

const getWishlist = async (req, res) => {
  return res.status(200).json(req.user.wishlist || [])
}

const addToWishlist = async (req, res) => {
  try {
    const { productId, title = '', price = 0, image = '' } = req.body
    if (!productId) {
      return res.status(400).json({ message: 'productId is required.' })
    }

    const user = await User.findById(req.user._id)
    const exists = user.wishlist.some((item) => item.productId === productId)
    if (!exists) {
      user.wishlist.push({ productId, title, price, image })
      await user.save()
    }

    return res.status(200).json(user.wishlist)
  } catch (error) {
    return res.status(500).json({ message: 'Failed to update wishlist.' })
  }
}

const removeFromWishlist = async (req, res) => {
  try {
    const { productId } = req.params
    const user = await User.findById(req.user._id)
    user.wishlist = user.wishlist.filter((item) => item.productId !== productId)
    await user.save()
    return res.status(200).json(user.wishlist)
  } catch (error) {
    return res.status(500).json({ message: 'Failed to remove item from wishlist.' })
  }
}

module.exports = {
  getCart,
  addToCart,
  removeFromCart,
  getWishlist,
  addToWishlist,
  removeFromWishlist,
}
