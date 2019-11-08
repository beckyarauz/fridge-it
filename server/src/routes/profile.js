const router = require('express').Router();

const balance = require('../balance').BalanceService;

const User = require('../models/User.model');

const acl = require('../../middlewares').acl;
const own = require('../../middlewares').own;
const or = require('../../middlewares').or;
const has = require('../../middlewares').has;

const staticData = [
  {
    id: "1234",
    username: "Hans"
  },
  {
    id: "456",
    username: "Broke-Bryan"
  }
];

router.get('/user/', acl('user_list_all'), (req, res) => {
  staticData.forEach((user) => {
    user.balance = balance.get(user.id);
  });
  res.json(staticData);
});

router.get(
  '/user/:userId',
  acl('user_list', or(has('user_list_all'), own('params.userId'))),
  async (req, res) => {
    const user = await User.findOne({_id: req.params.userId}).exec();

    if (user) {
      res.json(user);
    } else {
      res.sendStatus(404);
    }
  });

router.get(
  '/user/:userId/history',
  acl('user_list', or(has('user_list_all'), own('params.userId'))),
  async (req, res) => {
    if (req.user) {
      res.json(balance.getHistory(req.params.userId));
      return;
    }
    res.sendStatus(404);
  });

module.exports = router;
