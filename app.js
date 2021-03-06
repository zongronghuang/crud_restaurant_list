
// 引入 express 和 handlebars 和資料 json
const express = require('express')
const app = express()
const exphbs = require('express-handlebars')
const bodyParser = require('body-parser')
const methodOverride = require('method-override')
const session = require('express-session')
const flash = require('connect-flash')

// 非 production mode 時使用 dotenv 檔案
if (process.env.NODE_ENV !== 'production') {
  require('dotenv').config()
}

const routes = require('./routes')
require('./config/mongoose.js')

const PORT = process.env.PORT || 3000

// 使用 main.handlebars 作為基本模版
app.engine('handlebars', exphbs({
  defaultLayout: 'main'
}))

// 指定 handlebars 作為渲染引擎
app.set('view engine', 'handlebars')

// 建立 session
app.use(session({
  secret: process.env.SESSION_SECRET || 'mySecretKey',
  resave: false,
  saveUninitialized: true,
}))

app.use(express.static('public'))
app.use(bodyParser.urlencoded({ extended: true }))
app.use(methodOverride('_method'))

const usePassport = require('./config/passport.js')
usePassport(app)

// 導入 connect-flash
app.use(flash())

// 存在 res.locals 的常用資料
app.use((req, res, next) => {
  res.locals.user = req.user
  res.locals.isAuthenticated = req.isAuthenticated()
  res.locals.success_msg = req.flash('success_msg')
  res.locals.warning_msg = req.flash('warning_msg')

  if (req.session.flash.hasOwnProperty('error')) {
    res.locals.errors = [{ message: req.flash('error') }]
  }

  next()
})

// 不同分頁的路由
app.use(routes)


// 設定 server 監聽器
app.listen(PORT, (req, res) => {
  console.log(`Server running. 
    Server URL: http://localhost:${PORT}`)
})