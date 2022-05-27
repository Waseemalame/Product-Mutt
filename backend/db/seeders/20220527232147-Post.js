'use strict';

module.exports = {
  up: (queryInterface, Sequelize) => {

   return queryInterface.bulkInsert('Posts', [
   {
    title: 'John Doe',
    content: 'Test content here',
    media: 'https://ph-files.imgix.net/6295b4c3-347a-4c30-aee8-d0473bf55da8.png',
    userId: 1,
  },
  {
    title: 'Will build your full stack website',
    content: 'I make you buy!',
    media: 'https://ph-files.imgix.net/6295b4c3-347a-4c30-aee8-d0473bf55da8.png',
    userId: 2,
  },
  {
    title: 'Join an online community to learn new skills',
    content: 'Test content here',
    media: 'https://ph-files.imgix.net/6295b4c3-347a-4c30-aee8-d0473bf55da8.png',
    userId: 3,
  }], {});
  },

  down: (queryInterface, Sequelize) => {

   return queryInterface.bulkDelete('Posts', null, {});
  }
};
