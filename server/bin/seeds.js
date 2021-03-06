const path = require('path')
require('dotenv').config({ path: path.join(__dirname, '../.env') })

// Seeds file that remove all users and create 2 new users

// To execute this seed, run from the root of the project
// $ node bin/seeds.js

const mongoose = require("mongoose");
const bcrypt = require("bcrypt");
const User = require("../src/user/User.model");

const bcryptSalt = 10;

require('../configs/database')

let users = [
  {
    username: "alice",
    password: bcrypt.hashSync("alice", bcrypt.genSaltSync(bcryptSalt)),
    role: 'admin'
  },
  {
    username: "bob",
    password: bcrypt.hashSync("bob", bcrypt.genSaltSync(bcryptSalt)),
    role: 'user'
  }
];

(async function() {
  const Fridge = require('../src/fridge/FridgeEntry.model').Fridge;
  await Fridge.deleteMany({});

  const Drinks = require('../src/drink/Drink.model').Drink;
  await Drinks.deleteMany({});

  User.deleteMany()
    .then(() => {
      return User.create(users)
    })
    .then(usersCreated => {
      console.log(`${usersCreated.length} users created with the following id:`);
      console.log(usersCreated.map(u => u._id));
    })
    .then(() => {
      // Close properly the connection to Mongoose
      mongoose.disconnect()
    })
    .catch(err => {
      mongoose.disconnect()
      throw err
    });
})();
