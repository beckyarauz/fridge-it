const _ = require('lodash');

const Fridge = require('./FridgeEntry.model').Fridge;
const FridgeEntry = require('./FridgeEntry.model').FridgeEntry;


class FridgeService {
  constructor() {}

  async list() {
    return _.map(await Fridge.find().populate('drink.reference'), FridgeEntry);
  }

  async add(drink, quantity) {
    let entry = await Fridge.findByDrinkId(drink.getDrinkId());

    if (!entry) {
      entry = Fridge.create(drink);
    }

    entry.add(quantity);

    await entry.save();
  }

  async isOnStock(drinkId, quantity) {
    let entry = await Fridge.findByDrinkId(drinkId);

    if (!entry) {
      return false;
    }

    return entry.isOnStock(quantity);
  }

  async retrieve(drinkId, quantity) {
    let entry = await Fridge.findByDrinkId(drinkId);

    if (!entry) {
      throw new Error('unknown drink');
    }

    entry.remove(quantity);
  }
}

module.exports = new FridgeService();
