const passport = require('koa-passport')
const LocalStrategy = require('passport-local').Strategy
const User = require('./models/user')

passport.serializeUser(function(user, done) {
  done(null, user.getName())
})

passport.deserializeUser(async function(name, done) {
  try {
    const user = await User.getUserByName(name)
    done(null, user)
  } catch(err) {
    done(err)
  }
})

passport.use(new LocalStrategy(function(username, password, done) {
  User.getUserByName(username)
    .then(user => {
      if (user.validate(password)) {
        done(null, user)
      } else {
        done(null, false)
      }
    })
    .catch(err => done(err))
}))
