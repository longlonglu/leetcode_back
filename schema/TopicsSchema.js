const mongoose = require("mongoose")

const TopicsSchema = mongoose.Schema({
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
  like: {
    type: Number,
    default: 0,
  },
  type: {
    type: [String],
  },
  coverText: {
    type: String,
  },
  user: {
    type: String,
  },
})

module.exports = mongoose.model("Topic", TopicsSchema)
