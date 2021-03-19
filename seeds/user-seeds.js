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
    email: "Pamela@email.com",
    password: "password1",
  },
  {
    name: "Tony",
    email: "tony@email.com",
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
