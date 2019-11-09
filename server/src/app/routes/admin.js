const router = require('express').Router();

const transaction = require('lib/transaction').TransactionService;
const drinkService = require('lib/drink').DrinkService;
const acl = require('app/middleware/acl').acl;

/**
 * @swagger
 * definition:
 *   respError:
 *     properties:
 *       message:
 *         type: string
 */
const ErrorResponse = function (res, code, message) {
  let asd = 'asd';
  return res.status(code).json({"message": message});
};

/**
 * @swagger
 * /api/admin/{userId}/balance/add:
 *   post:
 *     tags: [admin]
 *     summary: Adds balance to user
 *     produces:
 *       - application/json
 *     parameters:
 *       - in: path
 *         name: userId
 *         type: number
 *         description: user to add balance to
 *         required: true
 *       - in: body
 *         name: body
 *         required: true
 *         schema:
 *           type: object
 *           properties:
 *             balanceDelta:
 *               type: number
 *               description: balance to add
 *               required: true
 *     responses:
 *       200:
 *         description: successful transaction
 *       400:
 *         description: transaction failed
 *         schema:
 *           $ref: '#/definitions/respError'
 */
router.post("/admin/:userId/balance/add", acl("admin_balance_add"),
  (req, res) => {
    if (req.body.balanceDelta < 0) {
      ErrorResponse(res, 400, "only positive numbers allowed");
    } else {
      transaction.registerBalanceChange(req.param.userId,
        req.user.username, req.body.balanceDelta);
      res.status(200)
    }
  }
);

/**
 * @swagger
 * /api/admin/{userId}/balance/remove:
 *   post:
 *     tags: [admin]
 *     summary: Removes balance to user
 *     produces:
 *       - application/json
 *     parameters:
 *       - in: path
 *         name: userId
 *         type: number
 *         description: user to remove balance from
 *         required: true
 *       - in: body
 *         name: body
 *         required: true
 *         schema:
 *           type: object
 *           properties:
 *             balanceDelta:
 *               type: number
 *               description: balance to remove
 *               required: true
 *     responses:
 *       200:
 *         description: successful transaction
 *       400:
 *         description: transaction failed
 *         schema:
 *           $ref: '#/definitions/respError'
 */
router.post("/admin/:userId/balance/remove", acl("admin_balance_remove"),
  (req, res) => {
    if (req.body.balanceDelta < 0) {
      ErrorResponse(400, "only positive numbers allowed");
    } else {
      transaction.registerBalanceChange(req.param.userId,
        req.user.username, (req.body.balanceDelta * -1));
      res.status(200)
    }
  });

/**
 * @swagger
 * /api/admin/drinks/add:
 *   post:
 *     tags: [admin]
 *     summary: Adds new drink
 *     produces:
 *       - application/json
 *     parameters:
 *       - in: body
 *         name: body
 *         required: true
 *         schema:
 *           $ref: '#/definitions/drink'
 *     responses:
 *       200:
 *         description: successful transaction
 *       400:
 *         description: missing data
 *         schema:
 *           $ref: '#/definitions/respError'
 *       500:
 *         description: transaction failed
 *         schema:
 *           $ref: '#/definitions/respError'
 */
router.post("admin/drinks/add", acl('admin_drinks_add'), async (req, res, next) => {
  try {
    if (!req.body.drink || !req.body.drink.id) {
      return ErrorResponse(400, 'no drink id given');
    }

    if (!req.body.drink.details || !req.body.drink.details.name) {
      return ErrorResponse(400, 'no drink details given');
    }

    await drinkService.add(req.body.drink.id, req.body.drink.details);

    res.status(200);
  } catch (ex) {
    ErrorResponse(500, 'failed to add drink');
  }
});

module.exports = router;
