const Router = require('koa-router')
const router = new Router()

router.get('/admin', ctx => {
  ctx.body = 'admin'
})

module.exports = router
