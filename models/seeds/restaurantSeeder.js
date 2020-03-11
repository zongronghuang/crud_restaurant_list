const mongoose = require('mongoose')
const Restaurant = require('../restaurant.js')
const User = require('../user.js')
const restaurantList = require('./restaurant.json')
const results = restaurantList.results


mongoose.connect('mongodb://localhost/restaurant', { useNewUrlParser: true, useUnifiedTopology: true, useCreateIndex: true })

const db = mongoose.connection

db.on('error', () => {
  console.log('db error')
})

db.once('open', () => {
  console.log('db connected')

  User.find()
    .lean()
    .exec((err, users) => {
      if (err) return console.error(err)

      const restaurants = [...results]

      for (let j = 0; j < 3; j++) {
        Restaurant.create({
          name: restaurants[j].name,
          name_en: restaurants[j].name_en,
          category: restaurants[j].category,
          image: restaurants[j].image,
          location: restaurants[j].location,
          phone: restaurants[j].phone,
          google_map: restaurants[j].google_map,
          rating: restaurants[j].rating,
          description: restaurants[j].description,
          userId: users[0]._id
        })
      }

      for (let j = 3; j < 6; j++) {
        Restaurant.create({
          name: restaurants[j].name,
          name_en: restaurants[j].name_en,
          category: restaurants[j].category,
          image: restaurants[j].image,
          location: restaurants[j].location,
          phone: restaurants[j].phone,
          google_map: restaurants[j].google_map,
          rating: restaurants[j].rating,
          description: restaurants[j].description,
          userId: users[1]._id
        })
      }

    })



  // })



  // for (let i = 0; i < results.length; i++) {
  //   Restaurant.create({
  //     name: results[i].name,
  //     name_en: results[i].name_en,
  //     category: results[i].category,
  //     image: results[i].image,
  //     location: results[i].location,
  //     phone: results[i].phone,
  //     google_map: results[i].google_map,
  //     rating: results[i].rating,
  //     description: results[i].description,
  //   })
  // }

  console.log('done')
})

