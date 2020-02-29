
// 引入 express 和 handlebars 和資料 json
const express = require('express')
const app = express()
const port = 3000
const exphbs = require('express-handlebars')

// 使用 main.handlebars 作為基本模版
app.engine('handlebars', exphbs({
  defaultLayout: 'main'
}))

// 指定 handlebars 作為渲染引擎
app.set('view engine', 'handlebars')

// 指定靜態資料夾
app.use(express.static('public'))

// 首頁顯示所有餐廳
app.get('/', (req, res) => {
  res.send('hello world!')
})
// 列出全部 餐廳
app.get('/restaurants', (req, res) => {
  res.send('列出所有 restaurants')
})
// 新增一筆 restaurants 頁面
app.get('/restaurants/new', (req, res) => {
  res.send('新增 restaurant 頁面')
})
// 顯示一筆 restaurant 的詳細內容
app.get('/restaurants/:id', (req, res) => {
  res.send('顯示 restaurant 的詳細內容')
})
// 新增一筆  restaurant
app.post('/restaurant', (req, res) => {
  res.send('建立 restaurant')
})
// 修改 restaurant 頁面
app.get('/restaurants/:id/edit', (req, res) => {
  res.send('修改 restaurant 頁面')
})
// 修改 restauarnt
app.post('/restaurants/:id/edit', (req, res) => {
  res.send('修改 restaurant')
})
// 刪除 restaurant
app.post('/restaurants/:id/delete', (req, res) => {
  res.send('刪除 restaurant')
})



// // 設定搜尋路由
// app.get('/search', (req, res) => {
//   const keyword = req.query.keyword
//   const restaurantMatches = restaurantList.results.filter(restaurant => restaurant.name.toLowerCase().includes(keyword.toLowerCase()) || restaurant.name_en.toLowerCase().includes(keyword.toLowerCase()))

//   res.render('index', {
//     restaurants: restaurantMatches,
//     keyword: keyword
//   })
// })

// // 設定餐廳詳細資料路由
// app.get('/restaurants/:restaurant_id', (req, res) => {
//   const id = req.params.restaurant_id
//   const restaurantById = restaurantList.results.find(restaurant => id === restaurant.id.toString())

//   res.render('show', { restaurant: restaurantById })
// })

// 設定 server 監聽器
app.listen(port, (req, res) => {
  console.log(`Server running. 
    Server URL: http://localhost:${port}`)
})