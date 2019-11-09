const passport = require('passport');
const router = require('express').Router();
const User = require("lib/user/User.model");
const _ = require('lodash');

const bcrypt = require("bcrypt");
const bcryptSalt = 10;

const ErrorResponse = require('./dto/ErrorResponse');

/**
 * @swagger
 * /api/auth/signup:
 *   post:
 *     tags: [auth]
 *     summary: Registers an account
 *     produces:
 *       - application/json
 *     parameters:
 *       - in: body
 *         name: body
 *         description: id of the drink to get
 *         required: true
 *         schema:
 *           type: object
 *           properties:
 *             username:
 *               type: string
 *               required: true
 *             password:
 *               type: string
 *               required: true
 *             name:
 *               type: string
 *               required: true
 *     responses:
 *       200:
 *         description: user data
 *       403:
 *         description: unauthorized
 *         schema:
 *           $ref: '#/definitions/respError'
 */
router.post('/auth/signup', (req, res, next) => {
  const {username, password, name} = req.body;
  if (!username || !password) {
    ErrorResponse(res, 400, "Indicate username and password");
    return
  }
  User.findOne({ username })
    .then(userDoc => {
      if (userDoc !== null) {
        ErrorResponse(res, 409, "The username already exists");
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

/**
 * @swagger
 * /api/auth/login:
 *   post:
 *     tags: [auth]
 *     summary: Logs in
 *     produces:
 *       - application/json
 *     parameters:
 *       - in: body
 *         name: body
 *         description: id of the drink to get
 *         required: true
 *         schema:
 *           type: object
 *           properties:
 *             username:
 *               type: string
 *               required: true
 *             password:
 *               type: string
 *               required: true
 *     responses:
 *       200:
 *         description: user data
 *       403:
 *         description: unauthorized
 */
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

/**
 * @swagger
 * /api/auth/logout:
 *   get:
 *     tags: [auth]
 *     summary: Logs out
 *     produces:
 *       - application/json
 *     responses:
 *       200:
 *         description: message indicating whether logout was successful
 */
router.get('/auth/logout', (req, res) => {
  req.session.destroy((err) => {
    ErrorResponse(res, 200, 'You logged out succesfully');
  });
});

/**
 * @swagger
 * /api/auth/isLoggedIn:
 *   get:
 *     tags: [auth]
 *     summary: route to check if client is logged in
 *     produces:
 *       - application/json
 *     responses:
 *       200:
 *         description: message indicating whether client is logged in or not
 */
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
