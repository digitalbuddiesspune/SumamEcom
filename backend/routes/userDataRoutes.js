const express = require('express')
const { protect } = require('../middleware/authMiddleware')
const {
  getCart,
  addToCart,
  removeFromCart,
  getWishlist,
  addToWishlist,
  removeFromWishlist,
} = require('../controllers/userDataController')

const router = express.Router()

router.get('/cart', protect, getCart)
router.post('/cart', protect, addToCart)
router.delete('/cart/:productId', protect, removeFromCart)

router.get('/wishlist', protect, getWishlist)
router.post('/wishlist', protect, addToWishlist)
router.delete('/wishlist/:productId', protect, removeFromWishlist)

module.exports = router
