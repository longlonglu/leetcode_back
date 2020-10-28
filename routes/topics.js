const express = require("express")
const router = express.Router()
const TopicsSchema = require("../schema/TopicsSchema")
const { set } = require("mongoose")

//Get all
router.get("/", async (req, res) => {
  try {
    const topics = await TopicsSchema.find().sort({ date: "descending" })
    res.send(topics)
  } catch (err) {
    res.json({ message: err })
  }
})

router.get("/one", async (req, res) => {
  try {
    const topics = await TopicsSchema.findOne({ _id: req.query.id })
    res.send(topics)
  } catch (err) {
    res.status(400).json({ message: err })
  }
})

router.get("/like", async (req, res) => {
  try {
    const id = req.query.id
    const amount = parseInt(req.query.like) + 1
    const like = await TopicsSchema.updateOne(
      { _id: id },
      {
        $set: {
          like: amount,
        },
      }
    )
    res.json(like)
  } catch (err) {
    res.json({ message: err })
  }
})

router.get("/save", async (req, res) => {
  try {
    const { title, description, type, coverText, user } = req.query
    const topics = new TopicsSchema({
      title: title,
      description: description,
      type: type,
      coverText: coverText,
      user: user,
    })
    const savedTopcis = await topics.save(function (err) {
      if (err) {
        res.status(400).send(err)
      }
    })
    res.json({ message: "success" })
  } catch (e) {
    res.status(400).send(e)
  }
})

router.get("/update", async (req, res) => {
  const { id, title, description, type, coverText, user } = req.query
  try {
    const topic = await TopicsSchema.updateOne(
      { _id: id },
      {
        $set: {
          title: title,
          description: description,
          type: type,
          coverText: coverText,
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
    const topic = await TopicsSchema.deleteOne({ _id: req.query.id })
    res.json({ message: "success" })
  } catch (err) {
    res.status(400).send(err)
  }
})

module.exports = router
