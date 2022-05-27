'use strict';

module.exports = {
  up: (queryInterface, Sequelize) => {

   return queryInterface.bulkInsert('Comments', [
     {
     content: 'Saving this for later!',
     userId: 2,
     postId: 1
   },
     {
     content: 'Comment test here',
     userId: 3,
     postId: 2
   },
     {
     content: 'Can we bargain on the price?',
     userId: 3,
     postId: 1
   }
  ], {});
  },

  down: (queryInterface, Sequelize) => {

   return queryInterface.bulkDelete('Comments', null, {});
  }
};
