const bcrypt = require('bcryptjs')

if (process.env.NODE_ENV !== 'production') {
  require('dotenv').config()
}

const db = require('../../config/mongoose.js')
const Restaurant = require('../restaurant.js')
const User = require('../user.js')
const restaurants1 = require('./restaurant.json').results.slice(0, 3)
const restaurants2 = require('./restaurant.json').results.slice(3, 6)

const user1 = {
  name: 'user1',
  email: 'user1@example.com',
  password: '12345678'
}

const user2 = {
  name: 'user2',
  email: 'user2@example.com',
  password: '12345678'
}

const createPromise = (user, restaurants) => {
  return new Promise((resolve, reject) => {
    console.log('run promise')

    bcrypt.genSalt(10)
      .then(salt => bcrypt.hash(user.password, salt))
      .then(hash => User.create({
        name: user.name,
        email: user.email,
        password: hash
      }))
      .then(user => {
        const userId = user._id

        restaurants.forEach(restaurant => Restaurant.create({
          name: restaurant.name,
          name_en: restaurant.name_en,
          category: restaurant.category,
          image: restaurant.image,
          location: restaurant.location,
          phone: restaurant.phone,
          google_map: restaurant.google_map,
          rating: restaurant.rating,
          description: restaurant.description,
          userId
        }))
      })

    resolve(`Seeded all restaurants for ${user.name}`)
  })
}

createPromise(user1, restaurants1)
  .then(msg => console.log('Promise 1 success: ', msg))
  .catch(error => console.log('Promise 1 error: ', error))

createPromise(user2, restaurants2)
  .then(msg => console.log('Promise  success: ', msg))
  .catch(error => console.log('Promise 2 error: ', error))


// 不知道為什麼無法執行
// Promise.all([createPromise(user1, restaurants1), createPromise(user2, restaurants2)])
//   .then(msg => {
//     console.log(msg)
//     console.log('Seeding done')
//     process.exit()
//   })
//   .catch(error => console.error(error))
