const express = require('express')
const router = express.Router()

const passport = require('passport')
const bcrypt = require('bcryptjs')

const User = require('../../models/user.js')

// 登入頁面
router.get('/login', (req, res) => {
  res.render('login')
})

// 登入檢查
router.post('/login', (req, res, next) => {
  if (!req.body.email || !req.body.password) {
    req.flash('warning_msg', '需先登入才可使用')
  }
  next()
}, passport.authenticate('local', {
  successRedirect: '/',
  failureRedirect: '/users/login',
}))

// 註冊頁面
router.get('/register', (req, res) => {
  res.render('register')
})

// 註冊檢查
router.post('/register', (req, res) => {
  const { name, email, password, confirmPassword } = req.body

  // 加入錯誤訊息提示
  let errors = []

  if (!email || !password || !confirmPassword) {
    errors.push({ message: '電子郵件和密碼都是必填' })
  }

  if (password !== confirmPassword) {
    errors.push({ message: '密碼輸入錯誤' })
  }

  if (errors.length) {
    return res.render('register', {
      errors,
      name,
      email,
      password,
      confirmPassword
    })
  }

  User.findOne({ email }).then(user => {
    if (user) {
      // 加入訊息提示
      errors.push({ message: '這個 Email 已經註冊過了' })
      return res.render('register', {
        errors,
        name,
        email,
        password,
        confirmPassword
      })
    }

    return bcrypt
      .genSalt(10)
      .then(salt => bcrypt.hash(password, salt))
      .then(hash => User.create({
        name,
        email,
        password: hash
      }))
      .then(() => res.redirect('/'))
      .catch(err => console.log(err))
  })
})

// 登出
router.get('/logout', (req, res) => {
  req.logout()
  req.flash('success_msg', '成功登出')
  res.redirect('/users/login')
})

module.exports = router