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

const authRouter = require('./authRouter')
app.use(authRouter.routes()).use(authRouter.allowedMethods());

app.use((ctx, next) => {
  if (ctx.isAuthenticated()) {
    return next()
  } else {
    ctx.redirect('/')
  }
})

const adminRouter = require('./adminRouter')
app.use(adminRouter.routes()).use(adminRouter.allowedMethods());

app.listen(3000)
