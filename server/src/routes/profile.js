const express = require('express');

const router = express.Router();

const staticData = [
  {
    id: "1234",
    username: "Hans",
    balance: 42.42
  },
  {
    id: "456",
    username: "Broke-Bryan",
    balance: -3.50
  }
];

router.get('/', (req, res) => {
  res.json(staticData);
});

router.get('/:userId', (req, res) => {
  const data = staticData.find((elem) => elem.id === req.params.userId);

  if (data) {
    res.json(data);
  } else {
    res.sendStatus(404);
  }
});

module.exports = router;
