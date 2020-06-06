
// 引入 express 和 handlebars 和資料 json
const express = require('express')
const app = express()
const port = 3000
const exphbs = require('express-handlebars')
const bodyParser = require('body-parser')
const methodOverride = require('method-override')
const session = require('express-session')
const passport = require('passport')
const flash = require('connect-flash')




// 使用 main.handlebars 作為基本模版
app.engine('handlebars', exphbs({
  defaultLayout: 'main'
}))

// 指定 handlebars 作為渲染引擎
app.set('view engine', 'handlebars')



//引入 Restaurant Schema
const Restaurant = require('./models/restaurant.js')

// 非 production mode 時使用 dotenv 檔案
if (process.env.NODE_ENV !== 'production') {
  require('dotenv').config()
}

// 建立 session
app.use(session({
  secret: 'your secret key',
  resave: false,
  saveUninitialized: true,
}))

// 啟動 + 使用 passport
app.use(passport.initialize())
app.use(passport.session())
require('./config/passport.js')(passport)

// 導入 connect-flash
app.use(flash())

// 存在 res.locals 的常用資料
app.use((req, res, next) => {
  res.locals.user = req.user
  res.locals.isAuthenticated = req.isAuthenticated()
  res.locals.success_msg = req.flash('success_msg')
  res.locals.warning_msg = req.flash('warning_msg')

  next()
})

// 導入套件
app.use(express.static('public'))
app.use(bodyParser.urlencoded({ extended: true }))
app.use(methodOverride('_method'))


// 不同分頁的路由
app.use('/', require('./routes/modules/home.js'))
app.use('/restaurants', require('./routes/modules/restaurant.js'))
app.use('/users', require('./routes/modules/user.js'))
app.use('/auth', require('./routes/modules/auths.js'))

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