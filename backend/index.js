const express = require('express')
const cors = require('cors')
const dotenv = require('dotenv')
const connectDb = require('./config/db')
const authRoutes = require('./routes/authRoutes')
const userDataRoutes = require('./routes/userDataRoutes')

dotenv.config()

const app = express()
const PORT = process.env.PORT || 5000

app.use(cors())
app.use(express.json())

app.get('/api/health', (_req, res) => {
  res.status(200).json({ message: 'Backend is running.' })
})

app.use('/api/auth', authRoutes)
app.use('/api/user', userDataRoutes)

app.use((err, _req, res, _next) => {
  return res.status(500).json({ message: err.message || 'Server error' })
})

connectDb()
  .then(() => {
    app.listen(PORT, () => {
      console.log(`Server started on port ${PORT}`)
    })
  })
  .catch((error) => {
    console.error('Database connection failed:', error.message)
    process.exit(1)
  })
