'use strict';

module.exports = {
  up: (queryInterface, Sequelize) => {

   return queryInterface.bulkInsert('Posts', [
   {
    title: 'API MAKER',
    content: 'Create your API in minutes with Notion',
    media: 'https://ph-files.imgix.net/1a1c9538-6539-49d3-84b9-22f2760e4de1.gif',
    userId: 1,
    createdAt: new Date(),
    updatedAt: new Date()
  },
  {
    title: 'Trust Center by Drata',
    content: 'Automated showcase of your security and compliance posture!',
    media: 'https://ph-files.imgix.net/3fb11916-7ee1-48bb-bb3c-b35797644dfb.gif',
    userId: 2,
    createdAt: new Date(),
    updatedAt: new Date()
  },
  {
    title: 'Airplane',
    content: 'Quickly transform scripts, SQL, and more into internal tools',
    media: 'https://ph-files.imgix.net/9a381c04-a24c-4444-a1ff-0056f0f4a7a1.png',
    userId: 3,
    createdAt: new Date(),
    updatedAt: new Date()
  }], {});
  },

  down: (queryInterface, Sequelize) => {

   return queryInterface.bulkDelete('Posts', null, {});
  }
};
