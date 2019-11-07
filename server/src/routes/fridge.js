const router = require("express").Router();
const _ = require('lodash');

const fridge = require('../fridge').FridgeService;
const drinkService = require('../drink').DrinkService;

router.get('/drinks', (req, res, next) => {
  res.json({
    error: false,
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

router.post('/drinks/stockUp', (req, res, next) => {
  const drinks = req.body.drinks;

  let response = [];

  _.forEach(drinks, stockDrink => {
    const drink = drinkService.get(stockDrink.id);

    if (!drink) {
      response.push({ error: true, message: "drink does not exist", drinkId: stockDrink.id});

      return;
    }

    if (!_.isNumber(stockDrink.quantity)) {
      response.push({ error: true, message: "quantity must be number", drinkId: stockDrink.id});

      return;
    }

    fridge.add(drink, stockDrink.quantity);

    response.push({ error: false, message: "drink stocked up", drinkId: stockDrink.id});
  });

  res.status(200).json({
    result: response
  });
});

module.exports = router;
