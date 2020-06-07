const express = require('express')
const router = express.Router()
const Restaurant = require('../../models/restaurant.js')
const { authenticated } = require('../../config/auth.js')


// 首頁顯示所有餐廳
router.get('/', authenticated, (req, res) => {
  const userId = req.user._id

  Restaurant.find({ userId })
    .lean()
    .sort({ _id: 'asc' })
    .then(restaurants => res.render('index', { restaurants }))
    .catch(error => console.log(error))
})

module.exports = router