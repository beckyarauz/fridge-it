module.exports = {
  admin: {
    'drinks_list': true,
    'drinks_add': true,

    'fridge_list': true,
    'fridge_refill': true,
    'fridge_purchase': true,

    'user_list': true,
    'user_list_all': true,

    'admin_balance_add': true,
    'admin_balance_remove': true,
  },
  user: {
    'drinks_list': true,

    'fridge_list': true,
    'fridge_refill': true,
    'fridge_purchase': true,

    'user_list': true,
  },
  anonymous: {
    'drink_list': true,
    'fridge_list': true,
  }
};
