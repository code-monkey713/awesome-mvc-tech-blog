const User = require('./User');
const Project = require('./Project');
const Posts = require('./Posts');
const Comments = require('./Comments');


User.hasMany(Project, {
  foreignKey: 'user_id',
  onDelete: 'CASCADE'
});

Project.belongsTo(User, {
  foreignKey: 'user_id'
});



module.exports = { User, Project, Posts, Comments };
