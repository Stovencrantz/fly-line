const express = require("express");
const router = express.Router();

const User = require("../models/user");

router.get("/api/users", (req, res) => {
  User.find()
    .then((users) => res.json(users))
    .catch((err) => console.log(err));
});

router.post("/api/users", (req, res) => {
  const { name, email } = req.body;
  // const newUser = new User({
  //     name: name, email: email
  // })

  User.insertMany(
      { name: name, email: email }
    )
    .then((data) =>
{    console.log("Created account successfully")
      res.json({
        message: "Created account successfully",
      })}
    )
    .catch((err) =>
      res.status(400).json({
        error: err,
        message: "Error creating account",
      })
    );
});

module.exports = router;
