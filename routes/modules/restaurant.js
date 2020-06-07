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


// 取回 編輯餐廳資料頁面
router.get('/:id/edit', (req, res) => {
  const userId = req.user._id
  const _id = req.params.id

  Restaurant.findOne({ _id, userId })
    .lean()
    .then(restaurant => res.render('edit', { restaurant }))
    .catch(error => console.log(error))
})


// 修改 餐廳資料
router.put('/:id/edit', (req, res) => {
  const userId = req.user._id
  const _id = req.params.id
  const { name, name_en, category, image, location, phone, google_map, rating, description } = req.body

  return Restaurant.findOne({ _id, userId })
    .then(restaurant => {
      restaurant.name = name
      restaurant.name_en = name_en
      restaurant.category = category
      restaurant.image = image
      restaurant.location = location
      restaurant.phone = phone
      restaurant.google_map = google_map
      restaurant.rating = rating
      restaurant.description = description

      return restaurant.save()
    })
    .then(() => res.redirect(`/restaurants/${_id}`))
    .catch(error => console.log(error))
})

// 刪除 餐廳資料
router.delete('/:id', (req, res) => {
  const userId = req.user._id
  const _id = req.params.id

  return Restaurant.findOne({ _id, userId })
    .then(restaurant => restaurant.remove())
    .then(() => res.redirect('/'))
    .catch(error => console.log(error))
})


// 列出全部餐廳 + 依照所選方式排序
router.get('/', (req, res) => {
  const sortType = req.query.sort
  const userId = req.user._id

  console.log('type', sortType, 'userid', userId)
  if (sortType === "none" || !sortType) {
    return Restaurant.find({ userId })
      .lean()
      .then(restaurants => {
        return res.render('index', { restaurants: restaurants, noSort: true })
      })
      .catch(error => console.log(error))
  } else {
    return Restaurant.find({ userId })
      .sort({ [`${sortType}`]: 'asc' })
      .lean()
      .then(restaurants => {
        return res.render('index', { restaurants: restaurants, [`${sortType}`]: true })
      })
      .catch(error => console.log(error))
  }
})



module.exports = router