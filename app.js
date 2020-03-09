
// 引入 express 和 handlebars 和資料 json
const express = require('express')
const app = express()
const port = 3000
const exphbs = require('express-handlebars')
const bodyParser = require('body-parser')
const mongoose = require('mongoose')
const methodOverride = require('method-override')
const session = require('express-session')
const passport = require('passport')

// 用 Mongoose 與本機 MongoDB 連線
mongoose.connect('mongodb://localhost/restaurant', { useNewUrlParser: true, useUnifiedTopology: true, useCreateIndex: true })

// 使用 main.handlebars 作為基本模版
app.engine('handlebars', exphbs({
  defaultLayout: 'main'
}))

// 指定 handlebars 作為渲染引擎
app.set('view engine', 'handlebars')

// 使用 db 
const db = mongoose.connection

db.on('error', () => {
  console.log('mongodb error')
})
db.once('open', () => {
  console.log('mongodb connected!')
})

//引入 Restaurant Schema
const Restaurant = require('./models/restaurant.js')

app.use(session({
  secret: 'your secret key',
  resave: false,
  saveUninitialized: true,
}))

app.use(passport.initialize())
app.use(passport.session())
require('./config/passport.js')(passport)
app.use((req, res, next) => {
  res.locals.user = req.user
  res.locals.isAuthenticated = req.isAuthenticated()
  next()
})

// 使用靜態資料夾 + body-parser + method-override + routing js
app.use(express.static('public'))
app.use(bodyParser.urlencoded({ extended: true }))
app.use(methodOverride('_method'))
app.use('/', require('./routes/home.js'))
app.use('/restaurants', require('./routes/restaurant.js'))
app.use('/users', require('./routes/user.js'))



// 設定搜尋路由
app.get('/search', (req, res) => {
  const keyword = req.query.keyword

  Restaurant.find()
    .lean()
    .exec((err, restaurants) => {
      if (err) return console.error(err)

      const matches = restaurants.filter(restaurant => restaurant.name.toLowerCase().includes(keyword.toLowerCase()))

      if (matches.length > 0) {
        return res.render('index', { restaurants: matches, keyword: keyword })
      } else {
        return res.render('index', { restaurants: matches, keyword: keyword, failure: 'on' })
      }


    })
})

// 設定 server 監聽器
app.listen(port, (req, res) => {
  console.log(`Server running. 
    Server URL: http://localhost:${port}`)
})