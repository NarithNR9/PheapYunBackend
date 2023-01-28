const User = require('../models/User')
const bcrypt = require('bcryptjs')

exports.registerUser = async (req, res) => {
  const { username, email, password, favourite } = req.body

  //validate
  if (!username || !email || !password) {
    res.status(400).json({ message: 'Please include all field' })
  }

  const userExists = await User.findOne({ email })

  if (userExists) {
    return res.status(400).json({ message: 'User already exists' })
  }

  // Hash password
  const salt = await bcrypt.genSalt(10)
  const hashedPassword = await bcrypt.hash(password, salt)

  //create user
  const user = await User.create({
    username,
    email,
    password: hashedPassword,
    favourite,
  })

  if (user) {
    res.status(201).json({
      _id: user._id,
      username: user.username,
      email: user.email,
    })
  } else {
    res.status(400).json('Invalid user data')
  }
}

exports.loginUser = async (req, res) => {
  const { email, password } = req.body

  const user = await User.findOne({ email })

  if (!user) {
    return res.status(404).json({
      message: 'No user with this email.',
    })
  }

  // Check user and passwords match
  if (await bcrypt.compare(password, user.password)) {
    res.status(200).json({
      id: user._id,
      username: user.username,
      email: user.email,
      isAdmin: user.isAdmin,
      favourite: user.favourite,
      message: 'Login Successfully',
    })
  } else {
    return res.status(401).json({ message: 'Invalid credentials' })
  }
}

exports.updateProfile = async (req, res) => {
  const user = await User.findOne({ email: req.body.email })

  if (!user) {
    return res.status(404).json({ message: 'User not found' })
  }

  const updatedUser = await User.findOneAndUpdate(
    { email: req.body.email },
    { username: req.body.username },
    { new: true }
  )

  res.status(200).json({
    id: user._id,
    username: updatedUser.username,
    email: updatedUser.email,
    isAdmin: updatedUser.isAdmin,
    imageUrl: updatedUser.imageUrl,
    favourite: updatedUser.favourite,
    message: 'Updated user successfully',
  })
}

exports.googleLogin = async (req, res) => {
  const { username, email, favourite, imageUrl } = req.body
  const user = await User.findOne({ email: email })

  if (!user) {
    //create user
    const newUser = await User.create({
      username,
      email,
      imageUrl,
    })

    if (newUser) {
      res.status(201).json({
        _id: newUser._id,
        username: newUser.username,
        email: newUser.email,
        isAdmin: newUser.isAdmin,
        imageUrl: newUser.imageUrl,
        favourite: newUser.favourite,
        message: 'Registered Successfully',
      })
    } else {
      return res.status(400).json('Invalid user data')
    }
  } else {
    res.status(200).json({
      id: user._id,
      username: user.username,
      email: user.email,
      isAdmin: user.isAdmin,
      imageUrl: user.imageUrl,
      favourite: user.favourite,
      message: 'Login Successfully',
    })
  }
}

exports.getUsers = async (req, res) => {
  const user = await User.findOne({ username: 'nr9' }).select('-password')
  console.log(user)
}
