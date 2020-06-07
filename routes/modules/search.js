const express = require('express')
const router = express.Router()

const Restaurant = require('../../models/restaurant.js')

// 設定搜尋路由
router.get('/', (req, res) => {
  const keyword = req.query.keyword
  console.log(req.user)
  const userId = req.user._id

  Restaurant.find({ userId })
    .lean()
    .then(restaurants => {
      const matches = restaurants.filter(restaurant => restaurant.name.toLowerCase().includes(keyword.toLowerCase()))

      if (matches.length > 0) {
        return res.render('index', { restaurants: matches, keyword: keyword })
      } else {
        return res.render('index', { restaurants: matches, keyword: keyword, failure: 'on' })
      }
    })
    .catch(error => console.log(error))
})

module.exports = router