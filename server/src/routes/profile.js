const router = require('express').Router();

const balance = require('../balance').BalanceService;

const User = require('../models/User.model');

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

router.get('/user/', (req, res) => {
  staticData.forEach((user) => {
    user.balance = balance.get(user.id);
  });
  res.json(staticData);
});

router.get('/user/:userId', async (req, res) => {
  const user = await User.findOne({_id: req.params.userId}).exec();

  if (user) {
    res.json(user);
  } else {
    res.sendStatus(404);
  }
});

router.get('/user/:userId/history', async (req, res) => {
 if(req.user) {
   res.json(balance.getHistory(req.params.userId));
   return;
 }
  res.sendStatus(404);
});

module.exports = router;
