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
    console.log('Seed user info')

    bcrypt.genSalt(10)
      .then(salt => bcrypt.hash(user.password, salt))
      .then(hash => User.create({
        name: user.name,
        email: user.email,
        password: hash
      }))
      .then(user => {
        console.log('create restaurant promises')

        const promises = restaurants.map(restaurant => {
          restaurant.userId = user._id
          return Restaurant.create(restaurant)
        })

        resolve(promises)
        // resolve this parent promise with a promisified array of child promises
        // P{ [P{}, P{}, P{}] }
      })
      .catch(error => reject(error))
  })
}

Promise.all([createPromise(user1, restaurants1), createPromise(user2, restaurants2)])
  .then(promiseArrays => {
    const array = [...promiseArrays[0], ...promiseArrays[1]]
    // array = [P{}, P{}, P{}, ...]

    return Promise.all(array)
    // remove outer array
    // reveal and run all P{} objects to seed 
  })
  .then(values => {
    console.log('values', values)
    console.log('Seeding done')
    process.exit()
  })
  .catch(error => console.error(error))
