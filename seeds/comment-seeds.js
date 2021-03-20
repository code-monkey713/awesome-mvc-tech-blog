const { Comment } = require("../models");

const commentData = [
  {
    comment_text:
      "Nunc nec enim porta, dapibus quam eu, tincidunt orci. Mauris nec elit euismod, vestibulum orci in, sagittis leo. Phasellus cursus lacus et velit luctus hendrerit. Fusce quam libero, tempor eu nisi at, pretium bibendum quam.",
    dated_created: "03-16-2021",
    post_id: 1,
    comment_id: 2,
  },
  {
    comment_text:
      "Suspendisse consectetur orci ut dolor pellentesque maximus. Mauris vestibulum diam sed ante euismod porta. In sed odio ut nulla mattis viverra. Aliquam justo augue, ultricies sit amet nunc vitae, bibendum mattis mauris.",
    dated_created: "03-16-2021",
    post_id: 2,
    comment_id: 3,
  },
  {
    comment_text:
      "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Mauris eu condimentum nunc, vitae posuere nibh. Aliquam erat volutpat. Curabitur egestas sem a mi vehicula, nec sagittis justo luctus.",
    dated_created: "03-17-2021",
    post_id: 3,
    comment_id: 1,
  },
  {
    comment_text:
      "Orci varius natoque penatibus et magnis dis parturient montes, nascetur ridiculus mus. Praesent accumsan faucibus convallis.",
    dated_created: "03-18-2021",
    post_id: 4,
    comment_id: 5,
  },
  {
    comment_text:
      "Donec porttitor dictum congue. Donec at eros ac velit porta egestas sed quis felis. Sed nunc mi, suscipit efficitur consectetur nec, euismod quis diam. Suspendisse aliquam sagittis nibh sit amet fringilla.",
    dated_created: "03-19-2021",
    post_id: 5,
    comment_id: 4,
  },
];

const seedComments = () => Comment.bulkCreate(commentData);

module.exports = seedComments;
