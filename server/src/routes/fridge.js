const router = require("express").Router();

router.get('/drinks', (req, res, next) => {
  res.json({
    drinks: [
      {
        id: "cola",
        quantity: 10,
        details: {
          name: "Cola",
          image: "http//schoenesbild.to",
          basePrice: 1.00
        },
      },
      {
        id: "monster_espresso",
        quantity: 10,
        details: {
          name: "Monster Espresso",
          image: "http//schoenesbild.to",
          basePrice: 1.00
        },
      },
      {
        id: "club_mate",
        quantity: 10,
        details: {
          name: "Club Mate",
          image: "http//schoenesbild.to",
          basePrice: 1.00
        },
      }
    ]
  });
});

module.exports = router;
