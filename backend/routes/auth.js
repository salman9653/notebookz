const express = require("express");
const router = express.Router();
const User = require("../models/User");
const { body, validationResult } = require("express-validator");
const bcrypt = require("bcryptjs");
var jwt = require("jsonwebtoken");
const fetchuser = require("../middleware/fetchuser");
const JWT_SECRET = "qwertyuiopasdfghjklzxcvbnm";


// ROUTE 1 : Create a User using : POST "/api/auth/createuser" . No Login Required.

router.post(
  "/createuser",
  [
    body("name", "enter a valid name").isLength({ min: 3 }),
    body("email", "enter a valid email").isEmail(),
    body("password", "enter a strong password").isLength({ min: 4 }),
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
      const salt = await bcrypt.genSalt(10);
      secPass = await bcrypt.hash(req.body.password, salt);

      //Create a New User.
      user = await User.create({
        name: req.body.name,
        email: req.body.email,
        password: secPass,
      });
      const data = {
        id: user.id,
      };
      const authToken = jwt.sign(data, JWT_SECRET);
      res.json({ authToken });
    } catch (error) {
      //Catch Errors
      console.log(error.message);
      res.status(500).send("Internal Server Error");
    }
  }
);


//ROUTE 2 : Authenticate a User using : POST "/api/auth/login" . No Login Required.
router.post(
  "/login",
  [
    body("email", "enter a valid email").isEmail(),
    body("password", "password cannot be blsnk").exists(),
  ],
  async (req, res) => {
    let success = false;
    // If there are ERRORS return bad request and the errors.
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }

    const { email, password } = req.body;
    try {
      let user = await User.findOne({ email });
      if (!user) {
        success = false;
        return res.status(400).json({ success, error: "Please try to login with correct details or Sign Up" });
      }
      const passwordCompare = await bcrypt.compare(password, user.password);
      if (!passwordCompare) {
        success = false;
        return res.status(400).json({ success, error: "Please try to login with correct details or Sign Up" });
      }
      const data = {
        user: {
          id: user.id
        }
      };
      const authToken = jwt.sign(data, JWT_SECRET);
      success = true;
      res.json({ success, authToken });

    } catch (error) {
      //Catch Errors
      console.log(error.message);
      res.status(500).send("Internal Server Error");
    }
  }
);


//ROUTE 3 : Get loggedIn User Details using: POST "/api/auth/getuser". Login Required

router.post(
  "/getuser", fetchuser,
  async (req, res) => {
    try {
      userId = req.user.id
      const user = await User.findById(userId).select("-password")
      res.send(user)

    } catch (error) {
      //Catch Errors
      console.log(error.message);
      res.status(500).send("Internal Server Error");
    }
  }
)

module.exports = router;
