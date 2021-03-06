const express = require("express");
const router = express.Router();
const Note = require("../models/Note");
const { body, validationResult } = require("express-validator");
const fetchuser = require("../middleware/fetchuser");


// ROUTE 1 : Get all the N otes  using : GET "/api/notes/fetchallnotes" . Login Required.

router.get("/fetchallnotes", fetchuser, async (req, res) => {
  try {
    const notes = await Note.find({ user: req.user.id });
    res.json(notes);
  }
  catch (error) {
    //Catch Errors
    console.log(error.message);
    res.status(500).send("Internal Server Error");
  }
});


// ROUTE 2 : Adding a new Note using : POST "/api/notes/addnote" .  Login Required.

router.post("/addnote", fetchuser, [
  body("title", "enter a valid title").isLength({ min: 3 }),
  body("description", "Description must be atleast 5 characters").isLength({ min: 5 }),
],
  async (req, res) => {
    try {
      const { title, description, tag } = req.body;

      // If there are ERRORS return bad request and the errors.
      const errors = validationResult(req);
      if (!errors.isEmpty()) {
        return res.status(400).json({ errors: errors.array() });
      }

      const note = new Note({
        title, description, tag, user: req.user.id
      })
      const savedNote = await note.save()
      res.json(savedNote);
    }
    catch (error) {
      //Catch Errors
      console.log(error.message);
      res.status(500).send("Internal Server Error");
    }
  });


// ROUTE 3 : Update a Existing Note using : PUT "/api/notes/updatenote" .  Login Required.

router.put("/updatenote/:id", fetchuser, async (req, res) => {
  const { title, description, tag } = req.body;
  try {
    // Create newNote object
    const newNote = {};
    if (title) { newNote.title = title };
    if (description) { newNote.description = description };
    if (tag) { newNote.tag = tag };

    //Find the note to be updated & Update it
    let note = await Note.findById(req.params.id);
    if (!note) { return res.status(404).send("Not Found") }

    if (note.user.toString() !== req.user.id) {
      return res.status(401).send("Not Allowed");
    }

    note = await Note.findByIdAndUpdate(req.params.id, { $set: newNote }, { new: true })
    res.json({ note })
  }
  catch (error) {
    //Catch Errors
    console.log(error.message);
    res.status(500).send("Internal Server Error");
  }
})


// ROUTE 4 : Delete a Note using : DELETE "/api/notes/deletenote" .  Login Required.

router.delete("/deletenote/:id", fetchuser, async (req, res) => {
  try {
    //Find the note to be deleted & Delete it
    let note = await Note.findById(req.params.id);
    if (!note) { return res.status(404).send("Not Found") }

    //Allow Deletion only if the uster owns this note
    if (note.user.toString() !== req.user.id) {
      return res.status(401).send("Not Allowed");
    }

    note = await Note.findByIdAndDelete(req.params.id)
    res.json({ "Success": "Note Has Been Deleaded", note: note })
  }
  catch (error) {
    //Catch Errors
    console.log(error.message);
    res.status(500).send("Internal Server Error");
  }

})

module.exports = router;
