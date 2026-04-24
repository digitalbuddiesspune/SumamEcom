const mongoose = require('mongoose')

const cartItemSchema = new mongoose.Schema(
  {
    productId: { type: String, required: true },
    title: { type: String, default: '' },
    price: { type: Number, default: 0 },
    quantity: { type: Number, default: 1, min: 1 },
    image: { type: String, default: '' },
  },
  { _id: false }
)

const wishlistItemSchema = new mongoose.Schema(
  {
    productId: { type: String, required: true },
    title: { type: String, default: '' },
    price: { type: Number, default: 0 },
    image: { type: String, default: '' },
  },
  { _id: false }
)

const userSchema = new mongoose.Schema(
  {
    fullName: { type: String, required: true, trim: true },
    email: { type: String, required: true, unique: true, lowercase: true, trim: true },
    password: { type: String, required: true },
    phone: { type: String, default: '' },
    address: { type: String, default: '' },
    cart: [cartItemSchema],
    wishlist: [wishlistItemSchema],
  },
  { timestamps: true }
)

module.exports = mongoose.model('User', userSchema)
