const express = require("express");
const router = express.Router();
const User = require("../models/User");
const { body, validationResult } = require("express-validator");

//Create a User using : POST "/api/auth/createuser" . No Login Required.

router.post(
  "/createuser",
  [
    body("name", "enter a valid name").isLength({ min: 3 }),
    body("email", "enter a valid email").isEmail(),
    body("password", "enter a strong password").isLength({ min: 6 }),
  ],
  async (req, res) => {
    // If there are ERRORS return bad request and the errors.
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }
    //Check whether the user with same email exists.
    try {
      let user = await User.findOne({ email: req.body.email });
      if (user) {
        return res
          .status(400)
          .json({ error: "user with this email already exists" });
      }
      //Create a New User.
      user = await User.create({
        name: req.body.name,
        email: req.body.email,
        password: req.body.password,
      });
      res.json(user);
    } catch (error) {
      //Catch Errors
      console.log(error.message);
      res.status(500).send("Some ERROR occured");
    }
  }
);

module.exports = router;
