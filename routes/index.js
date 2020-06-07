const express = require('express')
const router = express.Router()
const home = require('./modules/home.js')
const user = require('./modules/user.js')
const restaurant = require('./modules/restaurant.js')
const auth = require('./modules/auth.js')
const { authenticator } = require('../middleware/auth.js')


router.use('/users', user)
router.use('/restaurants', authenticator, restaurant)
router.use('/auth', auth)
router.use('/', authenticator, home)

module.exports = router