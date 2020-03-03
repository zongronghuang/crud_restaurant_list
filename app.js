
// 引入 express 和 handlebars 和資料 json
const express = require('express')
const app = express()
const port = 3000
const exphbs = require('express-handlebars')
const bodyParser = require('body-parser')
const mongoose = require('mongoose')
const methodOverride = require('method-override')

mongoose.connect('mongodb://localhost/restaurant', { useNewUrlParser: true, useUnifiedTopology: true })

// 使用 main.handlebars 作為基本模版
app.engine('handlebars', exphbs({
  defaultLayout: 'main'
}))

// 指定 handlebars 作為渲染引擎
app.set('view engine', 'handlebars')



const db = mongoose.connection

db.on('error', () => {
  console.log('mongodb error')
})

db.once('open', () => {
  console.log('mongodb connected!')
})

const Restaurant = require('./models/restaurant.js')


// 指定靜態資料夾 + 使用 body parser
app.use(express.static('public'), bodyParser.urlencoded({ extended: true }))

app.use(methodOverride('_method'))

app.use('/', require('./routes/home.js'))
app.use('/restaurants', require('./routes/restaurant.js'))

// 設定搜尋路由
app.get('/search', (req, res) => {
  const keyword = req.query.keyword

  Restaurant.find({ name: keyword })
    .lean()
    .exec((err, restaurants) => {
      if (err) return console.error(err)
      return res.render('index', { restaurants: restaurants, keyword: keyword })
    })
})


// 設定 server 監聽器
app.listen(port, (req, res) => {
  console.log(`Server running. 
    Server URL: http://localhost:${port}`)
})