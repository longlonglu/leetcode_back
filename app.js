const express = require("express")
const session = require("express-session")
const passport = require("passport")
const app = express()
const topicsRoute = require("./routes/topics")
const questionsRoute = require("./routes/questions")
const authRoute = require("./routes/authRoute")
const cors = require("cors")
require("dotenv").config()
require("./config/db")
require("./config/passport")
app.use(cors())

// Session
app.use(
  session({
    secret: process.env.SECRET,
    resave: false,
    saveUninitialized: false,
    cookie: {
      maxAge: 1000 * 60 * 60 * 24,
    },
  })
)

app.use(passport.initialize())
app.use(passport.session())

app.use(express.json())
app.use("/topics", topicsRoute)
app.use("/questions", questionsRoute)
app.use("/auth", authRoute)
app.use("/test", (req, res) => {
  res.send("<h1> Hello </h1>")
})

const port = process.env.PORT || 5000
app.listen(port, () => {
  console.log(`server is running on port: ${port}`)
})
