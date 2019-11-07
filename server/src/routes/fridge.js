const router = require("express").Router();
const _ = require('lodash');

const fridge = require('../fridge').FridgeService;
const drinkService = require('../drink').DrinkService;

/**
 * @swagger
 * /api/fridge/drinks:
 *   get:
 *     description: Returns all currently available drinks
 *     produces:
 *       - application/json
 *     responses:
 *       200:
 *         description: An array of drinks
 *         schema:
 *           type: object
 *           properties:
 *             error:
 *               type: boolean
 *               description: indicates if there was an error
 *             drinks:
 *               type: array
 *               descripton: list of available drinks (if error false)
 *               items:
 *                 $ref: '#/definitions/drinks'
 */
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

/**
 * @swagger
 * /api/fridge/drinks/stockUp:
 *   post:
 *     description: Returns all currently available drinks
 *     produces:
 *       - application/json
 *     parameters:
 *       - in: body
 *         name: body
 *         required: true
 *         schema:
 *           type: object
 *           properties:
 *             drinks:
 *               type: array
 *               description: list of drinks to add
 *               items:
 *                 $ref: '#/definitions/reqStockUp'
 *     responses:
 *       200:
 *         schema:
 *           type: object
 *           properties:
 *             error:
 *               type: boolean
 *               description: indicates if there was an error
 *             drinks:
 *               type: array
 *               description: list of available drinks (if error false)
 *               items:
 *                 $ref: '#/definitions/respStockUp'
 */
router.post('/drinks/stockUp', (req, res, next) => {
  const drinks = req.body.drinks;

  let response = [];

  _.forEach(drinks, stockDrink => {
    const drink = drinkService.get(stockDrink.id);

    if (!drink) {
      response.push({error: true, message: "drink does not exist", drinkId: stockDrink.id});

      return;
    }

    if (!_.isNumber(stockDrink.quantity)) {
      response.push({error: true, message: "quantity must be number", drinkId: stockDrink.id});

      return;
    }

    fridge.add(drink, stockDrink.quantity);

    response.push({error: false, message: "drink stocked up", drinkId: stockDrink.id});
  });

  res.status(200).json({
    result: response
  });
});

/**
 * @swagger
 * definition:
 *   drinks:
 *     properties:
 *       id:
 *         type: string
 *       details:
 *         type: object
 *         properties:
 *          name:
 *            type: string
 *          image:
 *            type: string
 *          basePrice:
 *            type: double
 *
 *       quantity:
 *         type: integer
 */

/**
 * @swagger
 * definition:
 *   respStockUp:
 *     properties:
 *       error:
 *         type: boolean
 *       message:
 *         type: string
 *       drinkId:
 *         type: string
 */

/**
 * @swagger
 * definition:
 *   reqStockUp:
 *     properties:
 *       id:
 *         type: string
 *         description: the drink id
 *         required: true
 *       quantity:
 *         type: integer
 *         description: the amount to refill
 *         required: true
 */

module.exports = router;
