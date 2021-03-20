const sequelize = require('../config/connection');
const router = require('express').Router();
const { Post, Comment, User } = require('../models');
const withAuth = require('../utils/auth');

router.get('/', async (req, res) => {
  // try {
    // Get all projects and JOIN with user data
    // const projectData = await Project.findAll({
    //   include: [
    //     {
    //       model: User,
    //       attributes: ['name'],
    //     },
    //   ],
    // });

    // Serialize data so the template can read it
    // const projects = projectData.map((project) => project.get({ plain: true }));

    // Pass serialized data and session flag into template
    // res.render('homepage', { 
      // projects, 
      // logged_in: req.session.logged_in 
  //   });
  // } catch (err) {
  //   res.status(500).json(err);
  // }
  try {
    res.redirect("/home");
  } catch (err) {
    res.status(500).json(err);
  }
});

router.get("/dashboard", withAuth, async (req, res) => {
  try {
    const userData = await User.findByPk(req.session.user_id, {
      attributes: { exclude: ["password"] },
      include: [{ model: Post }],
    });

    const user = userData.get({ plain: true });

    res.render("dashboard", {
      ...user,
      loggedIn: true,
    });
  } catch (err) {
    res.status(500).json(err);
  }
});

router.get('/login', (req, res) => {
  if (req.session.loggedIn){
    // res.redirect('/posts');
    console.log('session is logged in');
  }
  res.render('login');
});

router.get('/signup', (req, res) => {
  res.render('signup');
});

router.get("/home", async (req, res) => {
  try {
    const dbPostData = await Post.findAll({
      include: [
        {
          model: User,
          attributes: ["name"],
        },
      ],
    });

    const posts = dbPostData.map((post) => post.get({ plain: true }));

    res.render("home", {
      posts,
      loggedIn: req.session.loggedIn,
    });
  } catch (err) {
    res.status(500).json(err);
  }
});

router.get("/post/:id", async (req, res) => {
  try {
    const dbPostData = await Post.findByPk(req.params.id, {
      include: [
        {
          model: User,
          attributes: ["name", "id"],
        },
        {
          model: Comment,
          attributes: ["comment_id", "comment_text", "date_created"],
          include: [
            {
              model: User,
              attributes: ["name"],
            },
          ],
        },
      ],
    });

    const post = dbPostData.get({ plain: true });

    res.render("post", {
      ...post,
      loggedIn: req.session.loggedIn,
    });
  } catch (err) {
    res.status(500).json(err);
  }
});

router.get("/new-post", withAuth, async (req, res) => {
  try {
    const userData = await User.findByPk(req.session.user_id, {
      attributes: { exclude: ["password"] },
      include: [{ model: Post }],
    });

    const user = userData.get({ plain: true });
    res.render("new-post", {
      ...user,
      loggedIn: true,
    });
  } catch (err) {
    res.status(500).json(err);
  }
});

router.get("/login", (req, res) => {
  if (req.session.loggedIn) {
    res.redirect("/dashboard");
    return;
  }

  res.render("login");
});

module.exports = router;
