'use strict';
const bcrypt = require('bcryptjs');

module.exports = {
  up: (queryInterface, Sequelize) => {
    return queryInterface.bulkInsert('Users', [
      {
        email: 'demo@user.io',
        username: 'Demo-lition',
        credentials: 'my credentials',
        twitter: 'https://twitter.com/WaseemAlame',
        instagram: 'https://www.instagram.com/metaseem/',
        website: 'https://www.google.com',
        hashedPassword: bcrypt.hashSync('password'),
      },
      {
        email: 'user1@user.io',
        username: 'FakeUser1',
        credentials: 'my credentials',
        twitter: 'https://twitter.com/WaseemAlame',
        instagram: 'https://www.instagram.com/metaseem/',
        website: 'https://www.google.com',
        hashedPassword: bcrypt.hashSync('password2')
      },
      {
        email: 'user2@user.io',
        username: 'FakeUser2',
        credentials: 'my credentials',
        twitter: 'https://twitter.com/WaseemAlame',
        instagram: 'https://www.instagram.com/metaseem/',
        website: 'https://www.google.com',
        hashedPassword: bcrypt.hashSync('password3')
      }
    ], {});
  },

  down: (queryInterface, Sequelize) => {
    const Op = Sequelize.Op;
    return queryInterface.bulkDelete('Users', {
      username: { [Op.in]: ['Demo-lition', 'FakeUser1', 'FakeUser2'] }
    }, {});
  }
};
