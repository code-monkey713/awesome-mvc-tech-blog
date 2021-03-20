const router = require('express').Router();
const { User, Post, Comment } = require('../../models');
const bcrypt = require("bcrypt");
const withAuth = require('../../utils/auth');

// router.get('/', async (req, res) => {
//   User.findAll({
//     attributes: { exclude: ['[password']}
//   })
//   .then(dbUser => res.json(dbUser))
//   .catch(err => {
//     console.log(err);
//     res.status(500).json(err);
//   })
// });

router.get("/:id", (req, res) => {
  User.findOne({
    attributes: { exclude: ["password"] },
    where: {
      id: req.params.id,
    },
    include: [
      {
        model: Post,
        attributes: ["id", "title", "content", "createdAt"],
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
  // User.create({
  //   name: req.body.name,
  //   email: req.body.email,
  //   password: req.body.password
  // })
  // .then(dbUser => {
  //   req.session.save(() => {
  //     req.session.user_id = dbUser.id;
  //     req.session.name = dbUser.name;
  //     req.session.loggedIn = true;
  //     res.json(dbUser);
  //   });
  // })
  //   .catch(err => {
  //     console.log(err);
  //     res.status(500).json(err);
  //   });
  try {
    const newUserData = req.body;
    newUserData.password = await bcrypt.hash(req.body.password, 10);
    const newUser = await User.create(newUserData);

    req.session.save(() => {
      req.session.user_id = newUser.id;
      req.session.loggedIn = true;

      res.status(200).json(newUser);
    });
  } catch (err) {
    res.status(400).json(err);
  }
});

router.post("/login", async (req, res) => {
  // User.findOne({
  //   where: {
  //     email: req.body.email,
  //   },
  // })
  //   .then((dbUserData) => {
  //     if (!dbUserData) {
  //       res.status(400).json({ message: "Incorrect email/password!" });
  //       return;
  //     }

  //     const validPassword = dbUserData.checkPassword(req.body.password);

  //     if (!validPassword) {
  //       res.status(400).json({ message: "Incorrect email/password!" });
  //       return;
  //     }
  //     req.session.save(() => {
  //       req.session.user_id = dbUserData.id;
  //       req.session.name = dbUserData.name;
  //       req.session.loggedIn = true;
  //       res.json({ user: dbUserData, message: "You are now logged in!" });
  //     });
  //   })
  //   .catch((err) => {
  //     console.log(err);
  //     res.status(500).json(err);
  //   });
  try {
    const userData = await User.findOne({ where: { email: req.body.email } });

    if (!userData) {
      res.status(400).json({ message: "Login failed. Please try again!" });
      return;
    }
    const validPassword = await bcrypt.compareSync(
      req.body.password,
      userData.password
    );

    if (!validPassword) {
      res
        .status(400)
        .json({ message: "Invalid credentials. Please try again!" });
      return;
    }

    req.session.save(() => {
      req.session.user_id = userData.id;
      req.session.loggedIn = true;

      res
        .status(200)
        .json({ user: userData, message: "You are now logged in!" });
    });
  } catch (err) {
    res.status(500).json(err);
  }
});

router.post('/logout', (req, res) => {
  // if (req.session.loggedIn) {
  //   req.session.destroy(() => {
  //     res.status(204).end();
  //   });
  // } else {
  //   res.status(404).end();
  // }
  if (req.session.loggedIn) {
    req.session.destroy(() => {
      res.status(204).end();
    });
  } else {
    res.status(404).json(err);
  }
});

router.delete("/:id", (req, res) => {
  User.destroy({
    where: {
      id: req.params.id,
    },
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

// router.put("/:id", (req, res) => {
//   User.update(req.body, {
//     individualHooks: true,
//     where: {
//       id: req.params.id,
//     },
//   })
//     .then((dbUserData) => {
//       if (!dbUserData[0]) {
//         res.status(404).json({ message: "No user found with this id" });
//         return;
//       }
//       res.json(dbUserData);
//     })
//     .catch((err) => {
//       console.log(err);
//       res.status(500).json(err);
//     });
// });

module.exports = router;
