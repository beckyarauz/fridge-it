const router = require('express').Router();

const balance = require('../balance').BalanceService;

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

router.get('/user/:userId', (req, res) => {
  const user = staticData.find((elem) => elem.id === req.params.userId);
  user.balance = balance.get(user.id);

  if (user) {
    res.json(user);
  } else {
    res.sendStatus(404);
  }
});

module.exports = router;
