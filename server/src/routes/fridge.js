const router = require("express").Router();
const _ = require('lodash');
const fridge = require('../fridge').FridgeService;


router.get('/drinks', (req, res, next) => {
  res.json({
    drinks: _.map(fridge.list(), entry => {
      return {
        id: entry.getDrink().getId(),
        details: entry.getDrink().getDetails(),
        quantity: entry.getQuantity()
      }
    })
  });
});

router.post('/drinks/retrieve', (req, res, next) => {
  const {drinkId, quantity} = req.body;

  if (!_.isNumber(quantity)) {
    res.status(400).json({message: 'quantity must be a number'});

    return;
  }

  if (!fridge.isOnStrock(drinkId, quantity)) {
    res.status(404).json({message: 'drink not on stock'});
  }

  fridge.retrieve(drinkId, quantity);

  next(res);
});

module.exports = router;
