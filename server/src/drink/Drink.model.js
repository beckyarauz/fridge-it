const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const schema = new Schema({
  drinkId: String,
  displayName: String,
  displayImage: String,
  basePrice: Number
}, {
  timestamps: {
    createdAt: 'created_at',
    updatedAt: 'updated_at'
  }
});

schema.statics.create = function(id, details) {
  let entry = new Drink();
  entry.drinkId = id;
  entry.displayName = details.name || "Drink Doe";
  entry.displayImage = details.image || null;
  entry.basePrice = details.basePrice || 1.00;

  return entry;
};

const Drink = mongoose.model('Drink', schema);

const DrinkEntry = function (drink) {
  if (!drink) {
    return;
  }

  const _drink = drink;

  return {
    getId: function () {
      return _drink._id;
    },

    getDrinkId: function () {
      return _drink.drinkId;
    },

    getDetails: function () {
      return {
        name: _drink.displayName,
        image: _drink.displayImage,
        basePrice: _drink.basePrice
      };
    }
  };
};

module.exports = {
  Drink: Drink,
  DrinkEntry: DrinkEntry
};
