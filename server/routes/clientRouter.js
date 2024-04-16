const express = require('express');

const clientRouter = express.Router();

const { User, Client } = require('../db/models');

clientRouter.get('/', async (req, res) => {
  const name = req.session.login;
  console.log(name);
  try {
    const user = await User.findOne({ where: { name } });
    const clients = await Client.findAll({ where: { user_id: user.id } });
    console.log(clients);
    res.json(clients);
  } catch (error) {
    res.send('Чтото пошло не так', error);
  }
});

clientRouter.put('/', async (req, res) => {
  const { clientId, newStatus } = req.body;
  try {
    const client = await Client.findByPk(clientId);
    if (client) {
      await client.update({ status: newStatus });
    } else {
      res.status(404).send('Клиент не найден');
    }
  } catch (error) {
    console.log('Ошибка при обновлении статуса клиента:', error);
    res.status(500).send('Что-то пошло не так');
  }
});

module.exports = clientRouter;
