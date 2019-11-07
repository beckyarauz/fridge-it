const _ = require('lodash');

const router = require('express').Router();

const drinkService = require('../drink').DrinkService;

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
 *     description: Returns all drinks
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
router.get('/drinks/', (req, res, next) => {
  res.status(200).json({
    drinks: _.map(drinkService.list(), DrinkDto)
  });
});

/**
 * @swagger
 * /api/drinks/{id}:
 *   get:
 *     tags: [drinks]
 *     description: Returns all drinks
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
 *
 */
router.get('/drinks/:id', (req, res, next) => {
  res.status(200).json({
    drink: DrinkDto(drinkService.get(req.params.id))
  })
});

module.exports = router;
