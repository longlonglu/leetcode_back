const mongoose = require("mongoose")
require("dotenv/config")

//connect to db
mongoose.connect(
  process.env.DB_CONNECTION,
  { useUnifiedTopology: true, useNewUrlParser: true },
  () => {
    console.log("connected to db")
  }
)

//mongodb+srv://new_user_test:LUlong.521@cluster0-8n46s.mongodb.net/test?retryWrites=true&w=majority
