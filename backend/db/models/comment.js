'use strict';
module.exports = (sequelize, DataTypes) => {
  const Comment = sequelize.define('Comment', {
    content: DataTypes.TEXT,
    userId: DataTypes.INTEGER,
    postId: DataTypes.INTEGER
  }, {});
  Comment.associate = function(models) {
    Comment.belongsTo(models.Post, { foreignKey: 'postId' });
    Comment.belongsTo(models.User, { foreignKey: 'userId' });
  };
  return Comment;
};
