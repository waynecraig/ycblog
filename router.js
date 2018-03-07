const Router = require('koa-router')
const passport = require('koa-passport')
const fs = require('fs')
const riot = require('riot')
const todo = require('./views/todo.tag')

const router = new Router()

router.post('/login', passport.authenticate('local', {
    successRedirect: '/admin',
    failureRedirect: '/login'
  }
))

router.get('/login', ctx => {
  ctx.type = 'html'
  //ctx.body = fs.createReadStream('./login.html')
  ctx.body = riot.render(todo, { title: 'test todo', items: [] })
})

module.exports = router
