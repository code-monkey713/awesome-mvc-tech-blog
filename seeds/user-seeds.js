const { hash } = require("bcrypt");
const { User } = require("../models");

const userData = [
  {
    name: "John",
    email: "john@email.com",
    password: "password1",
  },
  {
    name: "Jake",
    email: "jake@email.com",
    password: "password1",
  },
  {
    name: "Pamela",
    email: "pamela@email.com",
    password: "password1",
  },
  {
    name: "Sofia",
    email: "sofia@email.com",
    password: "password1",
  },
  {
    name: "Joe",
    email: "joe@email.com",
    password: "password1",
  },
];

const seedUsers = () => User.bulkCreate(userData);

module.exports = seedUsers;
