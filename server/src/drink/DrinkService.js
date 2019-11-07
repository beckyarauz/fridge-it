const _ = require('lodash');

class DrinkService {
  constructor() {
    this.drinks = {};
  }

  list() {
    return _.toArray(this.drinks);
  }

  add(drink) {
    if (this.drinks[drink.getId()]) {
      throw new Error("drink already present");
    }

    this.drinks[drink.getId()] = drink;
  }
}

module.exports = new DrinkService();
