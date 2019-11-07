const router = require("express").Router();
const _ = require('lodash');
const fridge = require('../fridge').FridgeService;


router.get('/drinks', (req, res, next) => {
  res.json(_.map(fridge.list(), entry => {
    return {
      id: entry.getDrink().getId(),
      details: entry.getDrink().getDetails(),
      quantity: entry.getQuantity()
    }
  }));
});

router.post('/drinks/retrieve', (req, res, next) => {
  if (!_.isNumber(req.body.quantity)) {
    res.status(500).json({message: 'quantity must be a number'});

    return;
  }

  fridge.retrieve(req.body.drinkId, req.body.quantity);

  next(res);
});

module.exports = router;
