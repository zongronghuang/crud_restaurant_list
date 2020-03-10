const mongoose = require('mongoose')
const bcrypt = require('bcryptjs')
const User = require('../user.js')
const defaultUsers = [
  {
    email: 'user1@example.com',
    password: '12345678'
  },
  {
    email: 'user2@example.com',
    password: '12345678'
  }
]

mongoose.connect('mongodb://localhost/restaurant', { useNewUrlParser: true, useUnifiedTopology: true, useCreateIndex: true })

const db = mongoose.connection

db.on('error', () => {
  console.log('db error')
})

db.once('open', () => {
  console.log('db connected')

  for (let i = 0; i < defaultUsers.length; i++) {
    const newUser = new User({
      email: defaultUsers[i].email,
      password: defaultUsers[i].password
    })

    bcrypt.genSalt(10, (err, salt) =>
      bcrypt.hash(newUser.password, salt, (err, hash) => {
        if (err) throw err
        newUser.password = hash

        newUser
          .save()
          .then(console.log('user added'))
          .catch(err => console.log(err))
      })
    )
  }

  console.log('done')
})

