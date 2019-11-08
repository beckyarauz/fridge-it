const _ = require('lodash');

const router = require('express').Router();

const drinkService = require('../drink').DrinkService;
const acl = require('../../middlewares').acl;

/**
 * @swagger
 * definition:
 *   drink:
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
 */
const DrinkDto = drink => {
  return {
    id: drink.getId(),
    details: drink.getDetails()
  }
};

/**
 * @swagger
 * /api/drinks:
 *   get:
 *     tags: [drinks]
 *     summary: Returns all drinks
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
 *               description: list of drinks
 *               items:
 *                 $ref: '#/definitions/drink'
 */
router.get('/drinks/', acl('drinks_list'), async (req, res, next) => {
  res.status(200).json({
    drinks: _.map(await drinkService.list(), DrinkDto)
  });
});

/**
 * @swagger
 * /api/drinks/{id}:
 *   get:
 *     tags: [drinks]
 *     summary: Returns all drinks
 *     produces:
 *       - application/json
 *     parameters:
 *       - in: path
 *         name: id
 *         description: id of the drink to get
 *         required: true
 *         type: string
 *     responses:
 *       200:
 *         description: An array of drinks
 *         schema:
 *           type: object
 *           properties:
 *             drink:
 *               $ref: '#/definitions/drink'
 */
router.get('/drinks/:id', acl('drinks_list'), async (req, res, next) => {
  res.status(200).json({
    drink: DrinkDto(await drinkService.get(req.params.id))
  })
});

module.exports = router;
