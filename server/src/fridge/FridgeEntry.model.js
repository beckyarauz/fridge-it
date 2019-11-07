const _ = require('lodash');

FridgeEntry = function (drink, quantity) {
  const _drink = drink;
  let _quantity = quantity || 0;

  return {
    getQuantity: function () {
      return _quantity;
    },

    getDrink: function () {
      return _drink;
    },

    isOnStock: function (quantity) {
      if (_quantity <= 0 || _quantity - quantity <= 0) {
        return false;
      }

      return true;
    },

    add: function (quantity) {
      if (!_.isNumber(quantity)) {
        throw new Error("not a number");
      }

      _quantity += quantity;
    },

    remove: function (quantity) {
      if (!_.isNumber(quantity)) {
        throw new Error("not a number");
      }

      if (_quantity <= 0 || _quantity - quantity <= 0) {
        throw new Error("not on stock");
      }

      _quantity -= quantity;
    }
  };
};

module.exports = FridgeEntry;
