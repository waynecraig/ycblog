const Router = require('koa-router')
const passport = require('koa-passport')
const fs = require('fs')

const router = new Router()

router.post('/login', passport.authenticate('local', {
    successRedirect: '/admin',
    failureRedirect: '/login'
  }
))

router.get('/login', ctx => {
  ctx.type = 'html'
  ctx.body = fs.createReadStream('./login.html')
})

module.exports = router
