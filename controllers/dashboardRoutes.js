const sequelize = require('../config/connection');
const router = require('express').Router();
const { Post, Comment, User } = require('../models');
// const withAuth = require('../utils/auth');

router.get('/', (req, res) => {

  res.render('dashboard', {

  });
})

module.exports = router;