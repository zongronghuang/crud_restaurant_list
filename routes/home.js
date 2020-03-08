const express = require('express')
const router = express.Router()
const Restaurant = require('../models/restaurant.js')
const { authenticated } = require('../config/auth.js')


// 首頁顯示所有餐廳
router.get('/', authenticated, (req, res) => {
  Restaurant.find({})
    .lean()
    .exec((err, restaurants) => {
      if (err) return console.error(err)
      return res.render('index', { restaurants: restaurants })
    })
})

module.exports = router