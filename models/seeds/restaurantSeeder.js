const db = require('../../config/mongoose.js')
const Restaurant = require('../restaurant.js')
const User = require('../user.js')
const restaurantList = require('./restaurant.json')
const results = restaurantList.results

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

  console.log('done')
})

