module.exports = {
  admin: {
    'drinks_list': true,
    'drinks_add': true,

    'fridge_list': true,
    'fridge_refill': true,
    'fridge_purchase': true,
  },
  user: {
    'drinks_list': true,
    'drinks_add': false,

    'fridge_list': true,
    'fridge_refill': true,
    'fridge_purchase': true,
  },
  anonymous: {
    'drink_list': true,
    'fridge_list': true
  }
};
