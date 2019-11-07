const _ = require('lodash');

const router = require('express').Router();

const fridge = require('../fridge').FridgeService;

router.post('/test/fridge/drinks/retrieve', (req, res, next) => {
  const {drinkId, quantity} = req.body;

  if (!_.isNumber(quantity)) {
    res.status(400).json({
      error: true,
      message: 'quantity must be a number'
    });

    return;
  }

  if (!fridge.isOnStock(drinkId, quantity)) {
    res.status(404).json({
      error: true,
      message: 'drink not on stock'
    });

    return;
  }

  fridge.retrieve(drinkId, quantity);

  res.status(200).json({error: false, message: "drink retrieved"});
});

module.exports = router;
