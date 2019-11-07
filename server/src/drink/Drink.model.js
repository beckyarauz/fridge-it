Drink = function (id, details) {
  details = details || {};

  const _id = id;
  const _details = {
    name: details.name || "Drink Doe",
    image: details.image || null,
    basePrice: details.basePrice || 1.00
  };

  return {
    getId: function () {
      return _id;
    },

    getDetails: function () {
      return _details;
    }
  };
};

module.exports = Drink;
