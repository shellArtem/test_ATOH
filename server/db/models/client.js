'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Client extends Model {
    static associate({ User }) {
      this.belongsTo(User, { foreignKey: 'user_id' });
    }
  }
  Client.init({
    accountNumber: DataTypes.STRING,
    surname: DataTypes.STRING,
    name: DataTypes.STRING,
    patronymic: DataTypes.STRING,
    date_of_birth: DataTypes.DATE,
    TIN: DataTypes.STRING,
    user_id: DataTypes.INTEGER,
    status: DataTypes.STRING
  }, {
    sequelize,
    modelName: 'Client',
  });
  return Client;
};