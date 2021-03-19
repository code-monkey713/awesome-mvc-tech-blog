const sequelize = require('../config/connection');
const router = require('express').Router();
const { Post, Comment, User } = require('../models');
// const withAuth = require('../utils/auth');

router.get('/', (req, res) => {

  res.render('dashboard', {

  });
})

router.get("/new", (req, res) => {
  res.render("new-post");
});

module.exports = router;