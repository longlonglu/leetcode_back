const express = require("express")
const router = express.Router()
const QuestionsSchema = require("../schema/QuestionsSchema")

router.get("/", async (req, res) => {
  try {
    console.log("accesed")
    const questions = await QuestionsSchema.find().sort({ date: "descending" })
    res.json(questions)
  } catch (err) {
    res.json({ message: err })
  }
})

router.get("/one", async (req, res) => {
  try {
    const questions = await QuestionsSchema.findOne({ _id: req.query.id })
    res.json(questions)
  } catch (err) {
    res.json({ message: err })
  }
})

router.get("/like", async (req, res) => {
  try {
    const id = req.query.id
    const amount = parseInt(req.query.like) + 1
    const like = await QuestionsSchema.updateOne(
      { _id: id },
      {
        $set: {
          like: amount,
        },
      }
    )
    res.json(like)
  } catch (err) {
    res.status(400).send(err)
  }
})

router.get("/save", async (req, res) => {
  try {
    console.log(req.query.level)
    const { title, description, type, level, user } = req.query
    const questions = new QuestionsSchema({
      title: title,
      description: description,
      type: type,
      level: level,
      user: user,
    })
    const savedQuestions = await questions.save()
    console.log(savedQuestions)
    res.json({ message: "success" })
  } catch (e) {
    res.status(400).send(e)
  }
})

router.get("/update", async (req, res) => {
  const { id, title, description, type, level, user } = req.query
  try {
    const topic = await QuestionsSchema.updateOne(
      { _id: id },
      {
        $set: {
          title: title,
          description: description,
          type: type,
          level: level,
          user: user,
        },
      }
    )
    res.json({ message: "success" })
  } catch (e) {
    res.status(400).send(e)
  }
})

router.get("/delete", async (req, res) => {
  try {
    const topic = await QuestionsSchema.deleteOne({ _id: req.query.id })
    res.json({ message: "success" })
  } catch (err) {
    res.status(400).send(err)
  }
})

module.exports = router
