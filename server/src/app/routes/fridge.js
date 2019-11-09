const _ = require('lodash');

const router = require('express').Router();

const fridgeService = require('lib/fridge').FridgeService;
const drinkService = require('lib/drink').DrinkService;
const transaction = require('lib/transaction').TransactionService;

const acl = require('app/middleware/acl').acl;

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
const RefillDto = (error, message, drinkId) => {
  return {
    error: error,
    message: message,
    drinkId: drinkId
  };
};

const RefillSuccess = (drinkId) => {
  return RefillDto(false, 'drink refilled', drinkId);
};

const RefillFailed = (message, drinkId) => {
  return RefillDto(true, message, drinkId);
};

/**
 * @swagger
 * /api/fridge/drinks:
 *   get:
 *     tags: [fridge]
 *     summary: Returns all currently available drinks
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
router.get('/fridge/drinks', acl('fridge_list'), async (req, res, next) => {
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
    drinks: _.map(await fridgeService.list(), entry => {
      return {
        id: entry.getDrink().getDrinkId(),
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
 *     tags: [fridge]
 *     summary: Refill drinks in fridge
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
router.post('/fridge/drinks', acl('fridge_refill'), async (req, res, next) => {
  const refills = req.body.drinks;
  const results = [];

  for (let i in refills) {
    let refill = refills[i];
    const drink = await drinkService.get(refill.id);

    if (!drink) {
      results.push(RefillFailed("drink does not exist", refill.id));

      continue;
    }

    if (!_.isNumber(refill.quantity)) {
      results.push(RefillFailed("quantity must be number", refill.id));

      continue;
    }

    await fridgeService.add(drink, refill.quantity);

    results.push(RefillSuccess(refill.id));
  }

  res.status(200).json({
    result: results
  });
});

/**
 * @swagger
 * /api/fridge/purchase:
 *   post:
 *     tags: [fridge]
 *     summary: Make a purchase of drinks
 *     produces:
 *       - application/json
 *     parameters:
 *       - in: body
 *         name: body
 *         required: true
 *         schema:
 *           type: object
 *           properties:
 *             drinkId:
 *               type: string
 *               description: id of the drink to buy
 *             userId:
 *               type: string
 *               description: id of the user making the purchase
 *             quantity:
 *               type: number
 *               description: the number of drinks to buy
 *     responses:
 *       200:
 *         description: purchase successful
 *       500:
 *         description: purchase failed
 */
router.post('/fridge/purchase', acl('fridge_purchase'), async (req, res) => {
  const drinkId = req.body.drinkId;
  const drinkQuantity = req.body.quantity;
  if (await fridgeService.isOnStock(drinkId, drinkQuantity)) {
    await fridgeService.retrieve(drinkId, drinkQuantity);
    transaction.registerPurchase(
      req.user._id.toString(),
      {id: drinkId, name: drinkId},
      drinkQuantity,
      drinkQuantity
    );
    res.sendStatus(200);
  } else {
    res.sendStatus(500);
  }
});

module.exports = router;
