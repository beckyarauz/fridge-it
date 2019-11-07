const _ = require('lodash');

const router = require('express').Router();

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
 *             drinks:
 *               type: array
 *               descripton: list of available drinks (if error false)
 *               items:
 *                 $ref: '#/definitions/drinks'
 */
router.get('/fridge/drinks', (req, res, next) => {

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
   *            type: number
   *            format: float
   *
   *       quantity:
   *         type: integer
   */
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

/**
 * @swagger
 * /api/fridge/drinks:
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
 *                 type: object
 *                 properties:
 *                   id:
 *                     type: string
 *                     description: the drink id
 *                     required: true
 *                   quantity:
 *                     type: integer
 *                     description: the amount to refill
 *                     required: true
 *     responses:
 *       200:
 *         schema:
 *           type: object
 *           properties:
 *             drinks:
 *               type: array
 *               description: list of available drinks (if error false)
 *               items:
 *                 $ref: '#/definitions/respRefill'
 */
router.post('/fridge/drinks', (req, res, next) => {
  const refills = req.body.drinks;

  let response = [];

  _.forEach(refills, refill => {
    const drink = drinkService.get(refill.id);

    if (!drink) {
      response.push({error: true, message: "drink does not exist", drinkId: refill.id});

      return;
    }

    if (!_.isNumber(refill.quantity)) {
      response.push({error: true, message: "quantity must be number", drinkId: refill.id});

      return;
    }

    fridge.add(drink, refill.quantity);

    response.push({error: false, message: "drink stocked up", drinkId: refill.id});
  });

  /**
   * @swagger
   * definition:
   *   respRefill:
   *     properties:
   *       error:
   *         type: boolean
   *       message:
   *         type: string
   *       drinkId:
   *         type: string
   */
  res.status(200).json({
    result: response
  });
});

module.exports = router;
