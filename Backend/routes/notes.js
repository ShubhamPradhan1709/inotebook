const express = require('express')
const { route } = require('./auth')
const { body, validationResult } = require('express-validator')
const fetchusers = require('../middleware/fetchusers')
const Notes = require('../models/notes')

const router = express.Router()

//ROUTE : 1
//Get all the notes
// POST "/fetchalldata"
router.get('/fetchalldata', fetchusers, async (req, res) => {
  try {
    console.log(req.user.id)
    const note = await Notes.find({ user: req.user.id })
    console.log(note)
    res.send(note)
  } catch (error) {
    console.log(error.message)
    res.status(500).send('Some Error ocurred. Try again later!')
  }
})

//ROUTE : 2
//Add all the notes
// POST "/fetchalldata"

router.post(
  '/addnotes',
  fetchusers,
  [
    body('title', 'Enter valid title').isLength({ min: 3 }),
    body('description', 'Description must be atleast 5 character').isLength({
      min: 5,
    }),
  ],
  async (req, res) => {
    const errors = validationResult(req)
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() })
    }

    try {
      const note = await Notes.create({
        user: req.user.id,
        title: req.body.title,
        description: req.body.description,
        tag: req.body.tag,
      })

      res.send(note)
    } catch (error) {
      console.log(error.message)
      res.status(500).send('Some Error ocurred. Try again later!')
    }
  }
)

//ROUTE : 3
//Update the existing notes
// POST "/updatenote/:id"

router.put('/updatenote/:id', fetchusers, async (req, res) => {
  try {
    const { title, description, tag } = req.body

    //Create a Newnotes object

    const Newnotes = {}

    if (title) {
      Newnotes.title = title
    }
    if (description) {
      Newnotes.description = description
    }
    if (tag) {
      Newnotes.tag = tag
    }

    //Find the note and update it by Newnotes

    let note = await Notes.findById(req.params.id)

    if (!note) {
      return res.status(404).send({ error: 'Not Found' })
    }
    if (note.user.toString() !== req.user.id) {
      return res.status(401).send('Not Allowed')
    }

    note = await Notes.findByIdAndUpdate(
      req.params.id,
      { $set: Newnotes },
      { new: true }
    )

    res.json(note)
  } catch (error) {
    console.log(error.message)
    res.status(500).send('Some Error ocurred. Try again later!')
  }
})

//ROUTE : 4
//Delete the existing notes
// POST "/updatenote/:id"

router.delete('/deletenote/:id', fetchusers, async (req, res) => {
  try {
    let note = await Notes.findById(req.params.id)

    if (!note) return res.status(404).send({ error: 'Not Found' })

    if (note.user.toString() !== req.user.id)
      return res.status(401).send('Not Allowed')

    note = await Notes.findByIdAndDelete(req.params.id)

    res.json({ success: 'Note has been deleted' })
  } catch (error) {
    console.log(error.message)
    res.status(500).send('Some Error ocurred. Try again later!')
  }
})
module.exports = router
