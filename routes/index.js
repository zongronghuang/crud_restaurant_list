const express = require('express')
const router = express.Router()
const home = require('./modules/home.js')
const user = require('./modules/user.js')
const restaurant = require('./modules/restaurant.js')

router.use('/', home)
router.use('/users', user)
router.use('/restaurants', restaurant)

module.exports = router