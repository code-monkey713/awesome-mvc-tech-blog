const router = require("express").Router();
const { User, Post } = require("../../models");
const withAuth = require("../../utils/auth");

router.post("/", withAuth, async (req, res) => {
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

router.put("/:id", async (req, res) => {
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
