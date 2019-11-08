const router = require('express').Router();

const transaction = require('../transaction').TransactionService;
const acl = require('../../middlewares').acl;

router.post("/admin/:userId/balance/add", acl("admin_balance_add"),
  (req, res) => {
    if (req.body.balanceDelta < 0) {
      res.status(400).json({"message":"only positive numbers allowed"});
    } else {
      transaction.registerBalanceChange(req.param.userId,
        req.user.username, req.body.balanceDelta);
      res.status(200)
    }
  }
);

router.post("/admin/:userId/balance/remove", acl("admin_balance_remove"),
  (req, res) => {
    if (req.body.balanceDelta < 0) {
      res.status(400).json({"message":"only positive numbers allowed"});
    } else {
      transaction.registerBalanceChange(req.param.userId,
        req.user.username, (req.body.balanceDelta * -1));
      res.status(200)
    }
  });

module.exports = router;
