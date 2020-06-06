const mongoose = require('mongoose')

// 用 Mongoose 與本機 MongoDB 連線
mongoose.connect('mongodb://localhost/restaurant', {
  useNewUrlParser: true,
  useUnifiedTopology: true,
  useCreateIndex: true
})

// 使用 db 
const db = mongoose.connection

db.on('error', () => {
  console.log('mongodb error')
})

db.once('open', () => {
  console.log('mongodb connected!')
})

module.exports = db