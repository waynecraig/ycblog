const Koa = require('koa')
const app = new Koa()

const bodyParser = require('koa-bodyparser')
app.use(bodyParser())

const session = require('koa-session')
app.keys = ['secret']
app.use(session({}, app))

require('./auth')
const passport = require('koa-passport')
app.use(passport.initialize())
app.use(passport.session())

const router = require('./router')
app.use(router.routes()).use(router.allowedMethods());

app.use((ctx, next) => {
  if (ctx.isAuthenticated()) {
    return next()
  } else {
    ctx.redirect('/')
  }
})

app.listen(3000)
