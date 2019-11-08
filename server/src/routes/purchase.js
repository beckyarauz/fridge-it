const express = require('express');
const fridge = require('../fridge').FridgeService;
const transaction = require('../transaction').TransactionService;

const router = express.Router();

/**
 * @swagger
 * /api/purchase:
 *   post:
 *     tags: []
 *     description: Make a purchase of drinks
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
router.post('/purchase', (req, res) => {
  const drinkId = req.body.drinkId;
  const drinkQuantity = req.body.quantity;
  if (fridge.isOnStock(drinkId, drinkQuantity)) {
    fridge.retrieve(drinkId, drinkQuantity);
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
