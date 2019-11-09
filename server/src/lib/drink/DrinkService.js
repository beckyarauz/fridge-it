const _ = require('lodash');

const Drink = require('./Drink.model').Drink;
const DrinkEntry = require('./Drink.model').DrinkEntry;

class DrinkService {
  constructor() {
    this.drinks = {};
  }

  async list() {
    return _.map(await Drink.find(), DrinkEntry);
  }

  async add(id, details) {
    let entry = await Drink.findOne({drinkId: id});

    if(entry) {
      throw new Error('drink already existing');
    }

    if (!entry) {
      entry = Drink.create(id, details);
    }

    await entry.save();
  }

  async get(drinkId) {
    return DrinkEntry(await Drink.findOne({drinkId: drinkId}));
  }
}

module.exports = new DrinkService();
