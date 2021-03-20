const router = require('express').Router();
const { User, Post, Comment } = require('../../models');
const sequelize = require('../../config/connection');
const withAuth = require('../../utils/auth');
const { sync } = require('../../models/User');

router.get("/", (req, res) => {
  Post.findAll({
    attributes: ["id", "title", "content", "createdAt"],
    order: [["createdAt", "DESC"]],
    include: [
      {
        model: User,
        attributes: ["name"],
      },
      {
        model: Comment,
        attributes: ["id", "comment_text", "post_id", "user_id", "createdAt"],
        include: {
          model: User,
          attributes: ["name"],
        },
      },
    ],
  })
    .then((dbPostData) => res.json(dbPostData.reverse()))
    .catch((err) => {
      console.log(err);
      res.status(500).json(err);
    });
});

router.get("/:id", (req, res) => {
  Post.findOne({
    where: {
      id: req.params.id,
    },
    attributes: ["id", "content", "title", "createdAt"],
    include: [
      {
        model: User,
        attributes: ["name"],
      },
      {
        model: Comment,
        attributes: ["id", "comment_text", "post_id", "user_id", "createdAt"],
        include: {
          model: User,
          attributes: ["name"],
        },
      },
    ],
  })
    .then((dbPostData) => {
      if (!dbPostData) {
        res.status(404).json({ message: "No post found with this id" });
        return;
      }
      res.json(dbPostData);
    })
    .catch((err) => {
      console.log(err);
      res.status(500).json(err);
    });
});

router.post("/", withAuth, async (req, res) => {
  // Post.create({
  //   title: req.body.title,
  //   content: req.body.content,
  //   user_id: req.session.user_id,
  // })
  //   .then((dbPostData) => res.json(dbPostData))
  //   .catch((err) => {
  //     console.log(err);
  //     res.status(500).json(err);
  //   });
  try {
    const newPostData = await Post.create({
      ...req.body,
      user_id: req.session.user_id,
    });
    res.status(200).json(newPostData);
  } catch (err) {
    res.status(400).json(err);
  }
});

router.put("/:id", withAuth, async (req, res) => {
  // Post.update(
  //   {
  //     title: req.body.title,
  //     content: req.body.content,
  //   },
  //   {
  //     where: {
  //       id: req.params.id,
  //     },
  //   }
  // )
  //   .then((dbPostData) => {
  //     if (!dbPostData) {
  //       res.status(404).json({ message: "No post found with this id" });
  //       return;
  //     }
  //     res.json(dbPostData);
  //   })
  //   .catch((err) => {
  //     console.log(err);
  //     res.status(500).json(err);
  //   });
  try {
    const editPost = await Post.update(req.body, {
      where: {
        id: req.body.id,
      },
    });

    if (!editPost) {
      res.status(404).json("No post found");
    }

    res.status(200).json(editPost);
  } catch (err) {
    res.status(500).json(err);
  }
});

router.delete("/:id", withAuth, async (req, res) => {
  // Post.destroy({
  //   where: {
  //     id: req.params.id,
  //   },
  // })
  //   .then((dbPostData) => {
  //     if (!dbPostData) {
  //       res.status(404).json({ message: "No post found with this id" });
  //       return;
  //     }
  //     res.json(dbPostData);
  //   })
  //   .catch((err) => {
  //     console.log(err);
  //     res.status(500).json(err);
  //   });
  try {
    const delPost = await Post.destroy({
      where: {
        id: req.body.id,
      },
    });
    if (!delPost) {
      res.status(404).json({ message: "No post found with that id!" });
      return;
    }
    res.status(200).json(delPost);
  } catch (err) {
    res.status(500).json(err);
  }
});

module.exports = router;
