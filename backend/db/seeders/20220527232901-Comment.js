'use strict';

module.exports = {
  up: (queryInterface, Sequelize) => {

   return queryInterface.bulkInsert('Comments', [
     {
     content: 'Saving this for later!',
     userId: 2,
     postId: 1,
     createdAt: new Date(),
     updatedAt: new Date()
   },
     {
     content: 'Comment test here',
     userId: 3,
     postId: 2,
     createdAt: new Date(),
     updatedAt: new Date()
   },
     {
     content: 'Can we bargain on the price?',
     userId: 3,
     postId: 1,
     createdAt: new Date(),
     updatedAt: new Date()
   }
  ], {});
  },

  down: (queryInterface, Sequelize) => {

   return queryInterface.bulkDelete('Comments', null, {});
  }
};
