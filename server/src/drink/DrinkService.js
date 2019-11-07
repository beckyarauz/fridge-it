const _ = require('lodash');
const Drink = require('./Drink.model');

class DrinkService {
  constructor() {
    this.drinks = {};
  }

  list() {
    return _.toArray(this.drinks);
  }

  add(id, details) {
    if (this.drinks[id]) {
      throw new Error("drink already present");
    }

    this.drinks[id] = Drink(id, details);
  }

  get(drinkId) {
    return this.drinks[drinkId];
  }
}

module.exports = new DrinkService();
