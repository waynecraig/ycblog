const Router = require('koa-router')
const passport = require('koa-passport')
const fs = require('fs')

const router = new Router()
router.get('/custom', ctx => passport.authenticate('local', (err, user, info, status) => {
    if (user == false) {
        ctx.body = 'no login'
    } else {
        ctx.body = 'logined'
        return ctx.login(user)
    }
})(ctx))

router.get('/app', ctx => {
    ctx.body = 'app'
})

router.post('/login', ctx => {
    passport.authenticate('local', {
        successRedirect: '/app',
        failureRedirect: '/'
    })
})

router.get('/', ctx => {
    ctx.type = 'html'
    ctx.body = fs.createReadStream('./login.html')
})

module.exports = router
