const passport = require('passport');
const router = require('express').Router();
const User = require("../models/User.model");
const _ = require('lodash');

// Bcrypt to encrypt passwords
const bcrypt = require("bcrypt");
const bcryptSalt = 10;

router.post('/auth/signup', (req, res, next) => {
  const {username, password, name} = req.body;
  if (!username || !password) {
    res.status(400).json({message: "Indicate username and password"});
    return
  }
  User.findOne({ username })
    .then(userDoc => {
      if (userDoc !== null) {
        res.status(409).json({message: "The username already exists"});
        return
      }
      const salt = bcrypt.genSaltSync(bcryptSalt);
      const hashPass = bcrypt.hashSync(password, salt);
      const newUser = new User({username, password: hashPass, name});
      return newUser.save()
    })
    .then(userSaved => {
      // LOG IN THIS USER
      // "req.logIn()" is a Passport method that calls "serializeUser()"
      // (that saves the USER ID in the session)
      req.logIn(userSaved, () => {
        // hide "encryptedPassword" before sending the JSON (it's a security risk)
        userSaved.password = undefined;
        res.json( userSaved );
      });
    })
    .catch(err => next(err))
});

router.post('/auth/login', async (req, res, next) => {
  passport.authenticate('local', function(err, user, info) {
    if (err) { return next(err); }
    if (!user) { return res.json({error:info.message}); }
    req.logIn(user, function(err) {
      if (err) { return next(err); }
      const {username, _id} = user;
      res.json({username, _id});
    });
  })(req, res, next);
});

router.get('/auth/logout', (req, res) => {
  req.session.destroy((err) => {
    res.status(200).json({
      message: 'You logged out succesfully'
    })
  });
});

router.get('/auth/isLogged', (req, res) => {
  if (req.user !== undefined && req.user !== null) {
    res.status(200).json({
      message: 'You are logged in',
      isLogged: true,
      user: req.user._id
    })

  } else {
    res.status(200).json({
      message: 'not logged in',
      isLogged: false
    })
  }
});

module.exports = router;
