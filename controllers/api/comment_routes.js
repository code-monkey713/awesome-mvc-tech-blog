const router = require("express").Router();
const { User, Post, Comment } = require("../../models");
const withAuth = require("../../utils/auth");

router.post("/", withAuth, async (req, res) => {
  try {
    const newCommentData = await Comment.create({
      ...req.body,
      comment_id: req.session.user_id,
    });
    res.status(200).json(newCommentData);
  } catch (err) {
    res.status(400).json(err);
  }
});

module.exports = router;
