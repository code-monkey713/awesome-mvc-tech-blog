const { Comment } = require("../models");

const commentData = [
  {
    comment_text:
      "Nunc nec enim porta, dapibus quam eu, tincidunt orci. Mauris nec elit euismod, vestibulum orci in, sagittis leo. Phasellus cursus lacus et velit luctus hendrerit. Fusce quam libero, tempor eu nisi at, pretium bibendum quam.",
    user_id: 1,
    post_id: 1,
  },
  {
    comment_text:
      "Suspendisse consectetur orci ut dolor pellentesque maximus. Mauris vestibulum diam sed ante euismod porta. In sed odio ut nulla mattis viverra. Aliquam justo augue, ultricies sit amet nunc vitae, bibendum mattis mauris.",
    user_id: 2,
    post_id: 2,
  },
  {
    comment_text:
      "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Mauris eu condimentum nunc, vitae posuere nibh. Aliquam erat volutpat. Curabitur egestas sem a mi vehicula, nec sagittis justo luctus.",
    user_id: 3,
    post_id: 3,
  },
  {
    comment_text:
      "Orci varius natoque penatibus et magnis dis parturient montes, nascetur ridiculus mus. Praesent accumsan faucibus convallis.",
    user_id: 4,
    post_id: 4,
  },
  {
    comment_text:
      "Donec porttitor dictum congue. Donec at eros ac velit porta egestas sed quis felis. Sed nunc mi, suscipit efficitur consectetur nec, euismod quis diam. Suspendisse aliquam sagittis nibh sit amet fringilla.",
    user_id: 5,
    post_id: 5,
  },
];

const seedComments = () => Comment.bulkCreate(commentData);

module.exports = seedComments;
