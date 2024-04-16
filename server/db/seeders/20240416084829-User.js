'use strict';

/** @type {import('sequelize-cli').Migration} */

const { faker } = require('@faker-js/faker');

function generateFakeUsers() {
  let fakeUsers = [];
  for (let i = 0; i < 20; i++) {
    let fakeUser = {
      name: faker.internet.userName(),
      login: faker.string.uuid(),
      password: faker.internet.password(),
      createdAt: new Date(),
      updatedAt: new Date(),
    };
    fakeUsers.push(fakeUser);
  }
  return fakeUsers;
}

module.exports = {
  async up(queryInterface, Sequelize) {
    const fakeUsers = generateFakeUsers();
    await queryInterface.bulkInsert('Users', fakeUsers, {});
  },

  async down(queryInterface, Sequelize) {
    await queryInterface.bulkDelete('Users', null, {});
  }
};
