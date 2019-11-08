const _ = require('lodash');
const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const DrinkEntry = require('../drink').DrinkEntry;

const schema = new Schema({
  drink: {
    drinkId: String,
    reference: {type: Schema.Types.ObjectId, ref: 'Drink'}
  },
  quantity: Number,
}, {
  timestamps: {
    createdAt: 'created_at',
    updatedAt: 'updated_at'
  }
});

schema.statics.create = function (drink) {
  let entry = new Fridge();
  entry.drink.drinkId = drink.getDrinkId();
  entry.drink.reference = drink.getId();
  entry.quantity = 0;

  return entry;
};

schema.statics.findByDrinkId = async function (drinkId) {
  return Fridge.findOne({'drink.drinkId': drinkId});
};

schema.methods.isOnStock = function (quantity) {
  if (this.quantity <= 0 || this.quantity - quantity <= 0) {
    return false;
  }

  return true;
};

schema.methods.add = function (quantity) {
  if (!_.isNumber(quantity)) {
    throw new Error("not a number");
  }

  this.quantity += quantity;
};

schema.methods.remove = function (quantity) {
  if (!_.isNumber(quantity)) {
    throw new Error("not a number");
  }

  if (this.quantity <= 0 || this.quantity - quantity <= 0) {
    throw new Error("not on stock");
  }

  this.quantity -= quantity;
};

const Fridge = mongoose.model('Fridge', schema);

const FridgeEntry = function (fridge) {
  const _fridge = fridge;

  return {
    getQuantity: function () {
      return fridge.quantity;
    },

    getDrink: function () {
      return DrinkEntry(_fridge.drink.reference);
    }
  };
};

module.exports = {
  Fridge: Fridge,
  FridgeEntry: FridgeEntry
};
