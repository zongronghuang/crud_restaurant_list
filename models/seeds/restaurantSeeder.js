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
        const promises = []

        restaurants.forEach(restaurant => {
          restaurant.userId = user._id
          promises.push(Restaurant.create(restaurant))
        })

        return promises
      })
      .catch(error => console.log(error))
  })
}


Promise.all([createPromise(user1, restaurants1), createPromise(user2, restaurants2)])
  .then(msg => {
    console.log(msg)
    console.log('Seeding done')
    process.exit()
  })
  .catch(error => console.error(error))
