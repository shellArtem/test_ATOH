const express = require('express');

const loginRouter = express.Router();

const { User } = require('../db/models');

loginRouter.post('/', async (req, res) => {
  const { login, password } = req.body;
  console.log(req.body);
  try {
    const user = await User.findOne({ where: { login } });
    if (user) {
      const checkPass = password === user.password;
      if (checkPass) {
        req.session.login = user.name;
        req.session.save(() => {
          res.json({
            msg: 'Вы успешно авторизованы!',
            name: user.name,
            auth: true,
          });
        });
      } else {
        res.json({ err: 'Пароль неверный' });
      }
    } else {
      res.json({ err: 'Такой пользователь не найден' });
    }
  } catch (error) {
    res.send('Чтото пошло не так', error);
  }
});

module.exports = loginRouter;
