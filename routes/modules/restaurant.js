const express = require('express')
const router = express.Router()

const Restaurant = require('../../models/restaurant.js')

// 取回 新增餐廳 頁面
router.get('/new', (req, res) => {
  return res.render('new')
})

// 新增 餐廳資料
router.post('/', (req, res) => {
  const { name, name_en, category, image, location, phone, google_map, rating, description } = req.body

  return Restaurant.create({
    name,
    name_en,
    category,
    image,
    location,
    phone,
    google_map,
    rating,
    description,
    userId: req.user._id
  })
    .then(() => res.redirect('/'))
    .catch(error => console.log(error))
})

// 取回 餐廳詳細內容頁面
router.get('/:id', (req, res) => {
  const userId = req.user._id
  const _id = req.params.id

  return Restaurant.findOne({ _id, userId })
    .lean()
    .then(restaurant => res.render('show', { restaurant }))
    .catch(error => console.log(error))
})


// 列出全部餐廳 + 依照所選方式排序
router.get('/', (req, res) => {
  const sortType = req.query.sort

  if (sortType === "none" || !sortType) {
    Restaurant.find()
      .lean()
      .exec((err, restaurants) => {
        if (err) return console.error(err)
        return res.render('index', { restaurants: restaurants, noSort: true })
      })
  } else {
    Restaurant.find()
      .sort({ [`${sortType}`]: 'asc' })
      .lean()
      .exec((err, restaurants) => {
        if (err) return console.error(err)
        return res.render('index', { restaurants: restaurants, [`${sortType}`]: true })
      })
  }
})







// 取回 編輯餐廳資料頁面
router.get('/:id/edit', authenticated, (req, res) => {
  Restaurant.findOne({ _id: req.params.id, userId: req.user._id })
    .lean()
    .exec((err, restaurant) => {
      if (err) return console.error(err)
      return res.render('edit', { restaurant: restaurant })
    })
})

// 修改 餐廳資料
router.put('/:id/edit', authenticated, (req, res) => {
  Restaurant.findOne({ _id: req.params.id, userId: req.user._id }, (err, restaurant) => {
    if (err) return console.error(err)

    restaurant.name = req.body.name
    restaurant.name_en = req.body.name_en
    restaurant.category = req.body.category
    restaurant.image = req.body.image
    restaurant.location = req.body.location
    restaurant.phone = req.body.phone
    restaurant.google_map = req.body.google_map
    restaurant.rating = req.body.rating
    restaurant.description = req.body.description

    restaurant.save(err => {
      if (err) return console.error(err)
      return res.redirect(`/restaurants/${req.params.id}`)
    })
  })
})


// 刪除 餐廳資料
router.delete('/:id', authenticated, (req, res) => {
  Restaurant.findOne({ _id: req.params.id, userId: req.user._id }, (err, restaurant) => {
    if (err) return console.error(err)
    restaurant.remove(err => {
      if (err) return console.error(err)
      return res.redirect('/')
    })
  })
})

module.exports = router