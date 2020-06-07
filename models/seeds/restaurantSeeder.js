const bcrypt = require('bcryptjs')

if (process.env.NODE_ENV !== 'production') {
  require('dotenv').config()
}

const db = require('../../config/mongoose.js')
const Restaurant = require('../restaurant.js')
const User = require('../user.js')
const results1 = require('./restaurant1.json').results
const results2 = require('./restaurant2.json').results

const SEED_USER1 = {
  name: 'user1',
  email: 'user1@example.com',
  password: '12345678'
}

const SEED_USER2 = {
  name: 'user2',
  email: 'user2@example.com',
  password: '12345678'
}

db.once('open', () => {
  bcrypt
    .genSalt(10)
    .then(salt => bcrypt.hash(SEED_USER1.password, salt))
    .then(hash => User.create({
      name: SEED_USER1.name,
      email: SEED_USER1.email,
      password: hash
    }))
    .then(user => {
      const userId = user._id

      return Promise.all(Array.from(
        { length: 3 },
        (_, i) => {
          console.log('i', i)
          Restaurant.create({
            name: results1[i].name,
            name_en: results1[i].name_en,
            category: results1[i].category,
            image: results1[i].image,
            location: results1[i].location,
            phone: results1[i].phone,
            google_map: results1[i].google_map,
            rating: results1[i].rating,
            description: results1[i].description,
            userId
          })
        }

      ))

    })
    .then(() => {
      console.log('User1 done')
    })
    .catch(error => console.log(error))

  bcrypt
    .genSalt(10)
    .then(salt => bcrypt.hash(SEED_USER2.password, salt))
    .then(hash => User.create({
      name: SEED_USER2.name,
      email: SEED_USER2.email,
      password: hash
    }))
    .then(user => {
      const userId = user._id

      return Promise.all(Array.from(
        { length: 3 },
        (_, j) => {
          console.log('j', j)

          Restaurant.create({
            name: results2[j].name,
            name_en: results2[j].name_en,
            category: results2[j].category,
            image: results2[j].image,
            location: results2[j].location,
            phone: results2[j].phone,
            google_map: results2[j].google_map,
            rating: results2[j].rating,
            description: results2[j].description,
            userId
          })

        }

      ))

    })
    .then(() => {
      console.log('User 2 done')
    })
    .catch(error => console.log(error))
})



// db.once('open', () => {
//   bcrypt
//     .genSalt(10)
//     .then(salt => bcrypt.hash(SEED_USER2.password, salt))
//     .then(hash => User.create({
//       name: SEED_USER2.name,
//       email: SEED_USER2.email,
//       password: hash
//     }))
//     .then(user => {
//       const userId = user._id

//       return Promise.all(Array.from(
//         { length: 3 },
//         (_, j) => {
//           console.log('j', j)

//           Restaurant.create({
//             name: results2[j].name,
//             name_en: results2[j].name_en,
//             category: results2[j].category,
//             image: results2[j].image,
//             location: results2[j].location,
//             phone: results2[j].phone,
//             google_map: results2[j].google_map,
//             rating: results2[j].rating,
//             description: results2[j].description,
//             userId
//           })

//         }

//       ))

//     })
//     .then(() => {
//       console.log('User 2 done')
//       process.exit()
//     })
// })




