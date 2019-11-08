module.exports = {
  admin: {
    'drinks_list': true,
    'drinks_add': true,

    'fridge_list': true,
    'fridge_refill': true,
  },
  user: {
    'drinks_list': true,
    'drinks_add': false,

    'fridge_list': true,
    'fridge_refill': true,
  },
  anonymous: {
    'drink_list': true,
    'fridge_list': true
  }
};
