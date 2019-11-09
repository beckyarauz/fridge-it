const router = require('express').Router();

const balance = require('lib/balance').BalanceService;

const User = require('lib/user/User.model');

const acl = require('app/middleware/acl').acl;
const own = require('app/middleware/acl').own;
const or = require('app/middleware/acl').or;
const has = require('app/middleware/acl').has;

/**
 * @swagger
 * definition:
 *   userBalance:
 *     properties:
 *       id:
 *         type: string
 *         description: user's unique id
 *       username:
 *         type: string
 *         description: user's name
 *       balance:
 *         type: number
 *         description: current balance of the user
 */
const staticData = [
  {
    id: "1234",
    username: "Hans"
  },
  {
    id: "456",
    username: "Broke-Bryan"
  }
];

/**
 * @swagger
 * definition:
 *   user:
 *     properties:
 *       id:
 *         type: string
 *         description: user's unique id
 *       username:
 *         type: string
 *         description: user's name
 *       role:
 *         type: string
 *         description: user's role
 *       balance:
 *         type: number
 *         description: current balance of the user
 *       transactions:
 *         type: array
 *         description: the user's transactions
 *         items:
 *           $ref: '#/definitions/userHistory'
 */

/**
 * @swagger
 * definition:
 *   userHistory:
 *     description: content differs depending on type
 *     properties:
 *       type:
 *         type: string
 *         description: the type which specifies the content of the transaction
 */

/**
 * @swagger
 * /api/user/:
 *   get:
 *     tags: [user]
 *     summary: Gets all users
 *     produces:
 *       - application/json
 *     responses:
 *       200:
 *         description: list of users
 *         schema:
 *           $ref: '#/definitions/userBalance'
 */
router.get('/user/', acl('user_list_all'), (req, res) => {
  staticData.forEach((user) => {
    user.balance = balance.get(user.id);
  });
  res.json(staticData);
});

/**
 * @swagger
 * /api/user/{userId}:
 *   get:
 *     tags: [user]
 *     summary: Get details of one user
 *     produces:
 *       - application/json
 *     parameters:
 *       - in: path
 *         name: userId
 *         required: true
 *         description: user's unique id
 *     responses:
 *       200:
 *         description: user information
 *         schema:
 *           $ref: '#/definitions/user'
 */
router.get(
  '/user/:userId',
  acl('user_list', or(has('user_list_all'), own('params.userId'))),
  async (req, res) => {
    const user = await User.findOne({_id: req.params.userId}).exec();

    if (user) {
      res.json(user);
    } else {
      res.sendStatus(404);
    }
  });

/**
 * @swagger
 * /api/user/{userId}/history:
 *   get:
 *     tags: [user]
 *     summary: Get balance history of user
 *     produces:
 *       - application/json
 *     parameters:
 *       - in: path
 *         name: userId
 *         required: true
 *         description: user's unique id
 *     responses:
 *       200:
 *         description: balance information of user
 *         schema:
 *           type: array
 *           items:
 *             $ref: '#/definitions/userHistory'
 */
router.get(
  '/user/:userId/history',
  acl('user_list', or(has('user_list_all'), own('params.userId'))),
  async (req, res) => {
    if (req.user) {
      res.json(balance.getHistory(req.params.userId));
      return;
    }
    res.sendStatus(404);
  });

module.exports = router;
