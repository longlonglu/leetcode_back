const router = require("express").Router()
const passport = require("passport")
const bcrypt = require("bcrypt")
const User = require("../schema/UserSchema")

router.post("/login", passport.authenticate("local"), (req, res) => {
  const userName = req.body.username
  console.log(userName)
  res.send(String(userName))
})

router.post("/logout", (req, res) => {
  req.logout()
  res.json("success")
})

router.post("/signup", async (req, res) => {
  const { username, password } = req.body
  const hash = bcrypt.hashSync(password, 10)
  const user = new User({
    username: username,
    password: hash,
  })
  const savedUser = await user.save()
  res.json({ message: "success" })
})

module.exports = router
