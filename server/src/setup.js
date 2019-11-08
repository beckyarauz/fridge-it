const _ = require('lodash');

const drinkService = require('./drink').DrinkService;
const fridgeService = require('./fridge').FridgeService;

(async () => {
  const drinks = [
    {
      drinkId: 'cola',
      details: {
        name: "Cola",
        basePrice: 1.00,
        image: "drinks/cola.png"
      }
    },
    {
      drinkId: "monster_espresso",
      details: {
        name: "Monster Espresso",
        basePrice: 1.00,
        image: "drinks/monster_espresso.png"
      }
    },
    {
      drinkId: 'viva_agua_laut',
      details: {
        name: "Viva Con Agua Laut",
        basePrice: 1.00,
        image: "drinks/viva_agua_laut.png"
      }
    },
    {
      drinkId: 'club_mate',
      details: {
        name: "Club Mate",
        basePrice: 1.00,
        image: "drinks/club_mate.png"
      }
    }
  ];

  await _.forEach(drinks, async drink => {
    if(!await drinkService.get(drink.drinkId)) {
      await drinkService.add(drink.drinkId, drink.details);
    }
  });

  await _.forEach(await drinkService.list(), async drink => {
    if (drink.getDrinkId() === "cola") return;

    await fridgeService.add(drink, _.random(1, 10));
  });
})();

