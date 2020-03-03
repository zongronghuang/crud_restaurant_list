const express = require('express')
const router = express.Router()
const Restaurant = require('../models/restaurant.js')

// 首頁顯示所有餐廳
router.get('/', (req, res) => {
  return res.redirect('/restaurants')
})

module.exports = router