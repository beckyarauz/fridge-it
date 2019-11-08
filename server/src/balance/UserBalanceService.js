const transaction = require('../transaction').TransactionService;

class UserBalanceService {
  constructor() {
    //FIXME this is mock data setup at startup
    transaction.registerBalanceChange("1234", "system", 42.44);
    transaction.registerBalanceChange("456", "system", -3.55);
  }

  get(userId) {
    let balance = 0;

    const transactions = transaction.get(userId);
    transactions.forEach((entry) => {
      balance += entry.balanceDelta;
    });

    return balance;
  }

  getHistory(userId) {
    const history = transaction.get(userId);
    if (history) {
      return history;
    } else {
      return [];
    }
  }
}

module.exports = new UserBalanceService();
