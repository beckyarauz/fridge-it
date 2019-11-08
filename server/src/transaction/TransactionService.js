class TransactionService {
  constructor() {
    this.history = [];
  }

  get(userId) {
    return this.history.filter((entry) => entry.user === userId);
  }

  registerBalanceChange(userId, confirmer, balanceChange) {
    const change = {
      type: "balance",
      timestamp: Date.now(),
      user: userId,
      confirmedBy: confirmer,
      balanceDelta: balanceChange
    };
    this.history.push(change);
  };

  registerPurchase(userId, product, quantity, totalPrice) {
    const purchase = {
      type: "purchase",
      timestamp: Date.now(),
      user: userId,
      product: {
        id: product.id,
        name: product.name,
        quantity: quantity,
      },
      balanceDelta: -totalPrice
    };
    this.history.push(purchase);
  }
}

module.exports = new TransactionService();
