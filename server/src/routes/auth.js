const express = require("express");
const passport = require('passport');
const router = express.Router();
const User = require("../models/User.model");
const _ = require('lodash');

// Bcrypt to encrypt passwords
const bcrypt = require("bcrypt");
const bcryptSalt = 10;

router.post("/signup", async (req, res, next) => {
  try {

    const {
      username,
      password
    } = req.body
    if (!username || !password) {
      res.status(400).json({
        message: "Indicate username and password"
      })
      return
    }

    let userDoc = await User.findOne({
      username
    });

    if (userDoc !== null) {
      res.status(409).json({
        message: "The username already exists"
      })
      return
    } else {

      const salt = bcrypt.genSaltSync(bcryptSalt)
      const hashPass = bcrypt.hashSync(password, salt)
      const newUser = await User({
        username,
        password: hashPass
      });

      await newUser.save();

      passport.authenticate('local')(req, res, function () {

        res.status(200).json({
          message: "succesfully signed Up!",
          user: req.user
        })
      })
    }
  } catch (e) {
    console.log(e);
    next(e)
  }
});

// router.post("/login", async (req, res, next) => {
//   const {username, password} = req.body.user;
//   // first check to see if there's a document with that username
//   User.findOne({ username })
//     .then(userDoc => {
//       // "userDoc" will be empty if the username is wrong (no document in database)
//       if (!userDoc) {
//         // create an error object to send to our error handler with "next()"
//         next(new Error("Incorrect username "));
//         return
//       }
//
//       // second check the password
//       // "compareSync()" will return false if the "password" is wrong
//       if (!bcrypt.compareSync(password, userDoc.password)) {
//         // create an error object to send to our error handler with "next()"
//         next(new Error("Password is wrong"));
//         return
//       }
//
//       // LOG IN THIS USER
//       // "req.logIn()" is a Passport method that calls "serializeUser()"
//       // (that saves the USER ID in the session)
//       req.logIn(userDoc, () => {
//         // hide "encryptedPassword" before sending the JSON (it's a security risk)
//         userDoc.password = undefined;
//         res.json(userDoc)
//       })
//     })
//     .catch(err => next(err))
// });

router.post('/login', async (req, res, next) => {
  passport.authenticate('local', function(err, user, info) {
    if (err) { return next(err); }
    if (!user) { return res.json({error:info.message}); }
    req.logIn(user, function(err) {
      if (err) { return next(err); }
      user.password = undefined;
      res.json(user);
    });
  })(req, res, next);
});

router.get("/logout", (req, res) => {
  req.session.destroy((err) => {
    res.status(200).json({
      message: 'You logged out succesfully'
    })
  });
});

router.get("/isLogged", (req, res) => {
  if (req.user !== undefined && req.user !== null) {
    // if () {
    res.status(200).json({
      message: 'You are logged in',
      isLogged: true,
      user: req.user.username
    })

  } else {
    res.status(200).json({
      message: 'not logged in',
      isLogged: false
    })
  }

});

module.exports = router;
