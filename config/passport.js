const passport = require("passport")
const LocalStrategy = require("passport-local").Strategy
const bcrypt = require("bcrypt")
const User = require("../schema/UserSchema")

require("dotenv/config")

const customFields = {
  usernameField: "username",
  passwordField: "password",
}

const verifyCallback = async (username, password, done) => {
  try {
    const user = await User.findOne({ username: username })
    if (!user) {
      return done(null, false)
    }
    if (bcrypt.compareSync(password, user.password)) {
      return done(null, user)
    } else {
      return done(null, false)
    }
  } catch (err) {
    done(err)
  }
}

passport.use(new LocalStrategy(customFields, verifyCallback))

passport.serializeUser((user, done) => {
  done(null, user)
})

passport.deserializeUser(async (user, done) => {
  try {
    const newUser = await User.findOne({ _id: user._id })
    done(null, newUser)
  } catch (err) {
    done(err)
  }
})
