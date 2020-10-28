const mongoose = require("mongoose")

const QuestionsSchema = mongoose.Schema({
  title: {
    type: String,
    required: true,
  },
  description: {
    type: String,
    required: true,
  },
  date: {
    type: Date,
    default: Date.now,
  },
  type: {
    type: [String],
  },
  level: {
    type: String,
  },
  like: {
    type: Number,
    default: 0,
  },
  user: {
    type: String,
  },
})

module.exports = mongoose.model("Question", QuestionsSchema)
