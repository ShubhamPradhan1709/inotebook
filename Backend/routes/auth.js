const express = require('express')
const User = require('../models/User')
const router = express.Router()
const { body, validationResult } = require('express-validator')
const bcryptjs = require('bcryptjs')
const bcrypt = require('bcryptjs/dist/bcrypt')
const jwt = require('jsonwebtoken')
const fetchusers = require('../middleware/fetchusers')
const { findById } = require('../models/User')
const JWT_SECRET = 'thisismemakingreact'

//ROUTE : 1
//Create a User
// POST "/api/auth/createusers"

router.post(
  '/createuser',
  [
    body('email', 'Enter valid Email').isEmail(),
    body('name', 'Enter valid Name').isLength({ min: 3 }),
    body('password', 'Enter valid Password').isLength({ min: 5 }),
  ],
  async (req, res) => {
    const errors = validationResult(req)
    if (!errors.isEmpty()) {
      success = false
      return res.status(400).json({ success, errors: 'something went wrong' })
    }

    try {
      let user = await User.findOne({ email: req.body.email })

      //Checking for email in database, if it exist or not
      if (user) {
        success = false
        return res
          .status(400)
          .json({ success, error: 'User with this Email already exists' })
      }
      const salt = await bcrypt.genSalt(10)
      const secPass = await bcrypt.hash(req.body.password, salt)
      //Creating a new user
      user = await User.create({
        name: req.body.name,
        password: secPass,
        email: req.body.email,
      })

      const data = {
        user: {
          id: user.id,
        },
      }
      const Authtoken = jwt.sign(data, JWT_SECRET)
      success = true
      res.status(200).json({ success, Authtoken })
    } catch (error) {
      console.log(error.message)
      res.status(500).send('Some Error ocurred. Try again later!')
    }
  }
)

//ROUTE : 2
//Authenticate a User
// POST "/api/auth/login"

router.post(
  '/login',
  [
    body('email', 'Enter valid Email').isEmail(),
    body('password', 'Password cannot be blank').exists(),
  ],
  async (req, res) => {
    const errors = validationResult(req)
    if (!errors.isEmpty()) {
      return res.status(400).json({ success, errors: errors.array() })
    }

    const { email, password } = req.body

    try {
      let user = await User.findOne({ email })
      if (!user) {
        success = false
        return res
          .status(400)
          .json({ error: "Please enter correct I'D or Password" })
      }

      const comparePassword = await bcrypt.compare(password, user.password)
      if (!comparePassword) {
        success = false
        return res
          .status(400)
          .json({ success, error: "Please enter correct I'D or Password" })
      }

      const data = {
        user: {
          id: user.id,
        },
      }
      const Authtoken = jwt.sign(data, JWT_SECRET)
      let success = true
      res.status(200).json({ success, Authtoken })
    } catch (error) {
      let success = false
      res
        .status(500)
        .json({ success, error: 'Some Error ocurred. Try again later!' })
    }
  }
)

//ROUTE : 3
//Get logged in user details
// POST "/api/auth/getuser"

router.post('/getuser', fetchusers, async (req, res) => {
  try {
    const userId = req.user.id
    const user = await User.findById(userId).select('-password')
    res.send({ user })
  } catch (error) {
    console.log(error.message)
    res.status(500).send('Some Error ocurred. Try again later!')
  }
})

module.exports = router
