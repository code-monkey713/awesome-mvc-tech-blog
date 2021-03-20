const { Post } = require("../models");

const postData = [
  {
    title: "Lorem Ipsum I",
    text:
      "Sed laoreet ex ac malesuada luctus. Maecenas vestibulum quam sit amet velit elementum convallis. Praesent maximus augue in velit fringilla finibus. Curabitur iaculis viverra nibh ut ultrices.",
    dated_created: "03-10-2021",
    user_id: 1,
  },
  {
    title: "Lorem Ipsum II",
    text:
      "Phasellus sed leo vitae libero condimentum fermentum eu sed mauris. Pellentesque at augue tincidunt, luctus est non, dapibus justo. Duis venenatis ligula ipsum, sit amet maximus purus consequat at.",
    dated_created: "03-11-2021",
    user_id: 2,
  },
  {
    title: "Lorem Ipsum III",
    text:
      "Vestibulum semper luctus eros, ac fermentum mauris pellentesque ac. Nunc finibus, tellus ut volutpat porttitor, enim nunc euismod libero, a consequat nulla magna et ligula. Nulla facilisi.",
    dated_created: "03-12-2021",
    user_id: 3,
  },
  {
    title: "Lorem Ipsum IV",
    text:
      "Cras suscipit pretium leo. Nam sodales quam sed fringilla porta. Quisque sed hendrerit elit. Proin porta sapien vel tincidunt ultricies. Nam blandit nec nibh sed consectetur. Morbi nec augue a lacus ultricies ultricies.",
    dated_created: "03-14-2021",
    user_id: 4,
  },
  {
    title: "Lorem Ipsum V",
    text:
      "Nunc ullamcorper quam non lorem dictum, id efficitur odio euismod. Suspendisse vel tortor vitae ipsum convallis bibendum nec eget velit. Duis non arcu nec leo tincidunt facilisis sed id justo. Nulla facilisi.",
    dated_created: "03-15-2021",
    user_id: 5,
  },
];

const seedPosts = () => Post.bulkCreate(postData);

module.exports = seedPosts;
