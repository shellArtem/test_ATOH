'use strict';

/** @type {import('sequelize-cli').Migration} */

const { faker } = require('@faker-js/faker');

module.exports = {
  async up(queryInterface, Sequelize) {
    let fakeClients = [];

    for (let i = 0; i < 200; i++) {
      let fakeClient = {
        accountNumber: faker.number.int().toString(),
        surname: faker.person.lastName(),
        name: faker.person.firstName(),
        patronymic: faker.person.middleName(),
        date_of_birth: faker.date.birthdate(),
        TIN: faker.number.int().toString(),
        user_id: Math.floor(Math.random() * 20) + 1,
        status: 'Не в работе',
        createdAt: new Date(),
        updatedAt: new Date(),
      };

      fakeClients.push(fakeClient);
    }

    await queryInterface.bulkInsert('Clients', fakeClients, {});
  },

  async down(queryInterface, Sequelize) {
    await queryInterface.bulkDelete('Clients', null, {});
  }
};