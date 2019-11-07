const _ = require('lodash');

const Drink = require('./drink').Drink;

const drinkService = require('./drink').DrinkService;
const fridgeService = require('./fridge').FridgeService;

drinkService.add(Drink("cola", {
  name: "Cola",
  basePrice: 1.00,
  image: "drinks/cola.png"
}));

drinkService.add(Drink("monster_espresso", {
  name: "Monster Espresso",
  basePrice: 1.00,
  image: "drinks/monster_espresso.png"
}));

drinkService.add(Drink("viva_agua_laut", {
  name: "Viva Con Agua Laut",
  basePrice: 1.00,
  image: "drinks/viva_agua_laut.png"
}));

drinkService.add(Drink("club_mate", {
  name: "Club Mate",
  basePrice: 1.00,
  image: "drinks/club_mate.png"
}));

_.forEach(drinkService.list(), drink => {
  fridgeService.add(drink, _.random(1, 10));
});
