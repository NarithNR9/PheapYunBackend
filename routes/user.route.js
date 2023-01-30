const express = require('express')
const router = express.Router()
const {
  registerUser,
  getUsers,
  loginUser,
  updateProfile,
  googleLogin,
  getFavourites,
  updateFavourites
} = require('../controllers/user.controller')

router.post('/register', registerUser)

router.post('/login', loginUser)

router.post('/googleLogin', googleLogin)

router.post('/update', updateProfile)


router.get('/', getUsers)

router.get('/favourite/:email', getFavourites)

router.post('/updateFavourite', updateFavourites)

module.exports = router
