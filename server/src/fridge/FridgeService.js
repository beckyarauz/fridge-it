const _ = require('lodash');

const FridgeEntry = require('./FridgeEntry.model');

class FridgeService {
  constructor() {
    this.stock = {};
  }

  list() {
    return _.toArray(this.stock);
  }

  add(drink, quantity) {
    const entry = this.stock[drink.getId()] || new FridgeEntry(drink);

    entry.add(quantity);

    this.stock[drink.getId()] = entry;
  }

  isOnStrock(drinkId, quantity) {
    let entry = this.stock[drinkId];

    if (!entry) {
      return false;
    }

    if (entry.isOnStock(quantity)) {
      return false;
    }

    return true;
  }

  retrieve(drinkId, quantity) {
    let entry = this.stock[drinkId];

    if (!entry) {
      throw new Error('unknown drink');
    }

    entry.remove(quantity);
  }
}

module.exports = new FridgeService();
