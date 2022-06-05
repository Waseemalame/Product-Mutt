'use strict';
module.exports = (sequelize, DataTypes) => {
  const Post = sequelize.define('Post', {
    title:{
      allowNull: false,
      type: DataTypes.TEXT,
    },
    content: {type: DataTypes.TEXT, allowNull: false},
    media: {type: DataTypes.TEXT, allowNull: false},
    userId: {type: DataTypes.INTEGER, allowNull: false}
  },
  {
    scopes: {
      detailed: {
        attributes: {
          exclude: [
            "hashedPassword"
          ]
        }
      }
    }
  });
  Post.associate = function(models) {
    Post.belongsTo(models.User, { foreignKey: 'userId' });
    Post.hasMany(models.Comment, { foreignKey: 'postId' });
    Post.hasMany(models.Like, { foreignKey: 'postId' });
  };
  return Post;
};
