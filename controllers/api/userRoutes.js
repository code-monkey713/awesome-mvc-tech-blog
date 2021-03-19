const router = require('express').Router();
const { User, Post, Comment } = require('../../models');

router.get('/', async (req, res) => {
  User.findAll({
    attributes: { exclude: ['[password']}
  })
  .then(dbUser => res.json(dbUser))
  .catch(err => {
    console.log(err);
    res.status(500).json(err);
  })
});

router.get("/:id", (req, res) => {
  User.findOne({
    attributes: { exclude: ["password"] },
    where: {
      id: req.params.id,
    },
    include: [
      {
        model: Post,
        attributes: ["id", "title", "body", "createdAt"],
      },
      {
        model: Comment,
        attributes: ["id", "comment_text", "createdAt"],
        include: {
          model: Post,
          attributes: ["title"],
        },
      },
      {
        model: Post,
        attributes: ["title"],
      },
    ],
  })
    .then((dbUserData) => {
      if (!dbUserData) {
        res.status(404).json({ message: "No user found with this id" });
        return;
      }
      res.json(dbUserData);
    })
    .catch((err) => {
      console.log(err);
      res.status(500).json(err);
    });
});

router.post('/', async (req, res) => {
  // try {
  //   const userData = await User.create(req.body);

  //   req.session.save(() => {
  //     req.session.user_id = userData.id;
  //     req.session.logged_in = true;

  //     res.status(200).json(userData);
  //   });
  // } catch (err) {
  //   res.status(400).json(err);
  // }
  User.create({
    name: req.body.name,
    email: req.body.email,
    password: req.body.password
  })
  .then(dbUser => {
    req.session.save(() => {
      req.session.user_id = dbUser.id;
      req.session.name = dbUser.name;
      req.session.loggedIn = true;

      res.json(dbUser);
    });
  })
    .catch(err => {
      console.log(err);
      res.status(500).json(err);
    });
});

router.post('/login', async (req, res) => {
  try {
    const userData = await User.findOne({ where: { email: req.body.email } });
    if (!userData) {
      res
        .status(400)
        .json({ message: 'Incorrect email or password, please try again' });
      return;
    }

    const validPassword = await userData.checkPassword(req.body.password);

    if (!validPassword) {
      res
        .status(400)
        .json({ message: 'Incorrect email or password, please try again' });
      return;
    }

    req.session.save(() => {
      req.session.user_id = userData.id;
      req.session.name = userData.name;
      req.session.loggedIn = true;
      
      res.json({ user: userData, message: 'You are now logged in!' });
    });
  } catch (err) {
    res.status(400).json(err);
  }
  // User.findOne({
  //   where: {
  //     email: req.body.email,
  //   },
  // })
  //   .then((dbUserData) => {
  //     if (!dbUserData) {
  //       res.status(400).json({ message: "Wrong user/password" });
  //       return;
  //     }
  //     const validPassword = dbUserData.checkPassword(req.body.password);

  //     if (!validPassword) {
  //       res.status(400).json({ message: "Wrong user/password" });
  //       return;
  //     }
  //     req.session.save(() => {
  //       req.session.user_id = dbUserData.id;
  //       req.session.email = dbUserData.email;
  //       req.session.name = dbUserData.name;
  //       req.session.loggedIn = true;

  //       res.json({ user: dbUserData, message: "You are now logged in!" });
  //     });
  //   })
  //   .catch((err) => {
  //     console.log(err);
  //     res.status(500).json(err);
  //   });
});

router.post('/logout', (req, res) => {
  if (req.session.logged_In) {
    req.session.destroy(() => {
      res.status(204).end();
    });
  } else {
    res.status(404).end();
  }
});

module.exports = router;
