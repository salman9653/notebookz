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
  } catch (error) {
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
    } catch (error) {
      //Catch Errors
      console.log(error.message);
      res.status(500).send("Internal Server Error");
    }
  });


module.exports = router;
