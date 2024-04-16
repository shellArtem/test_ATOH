const router = require('express').Router();

router.get('/logout', (req, res) => {
  req.session.destroy(() => {
    res.clearCookie('testATOH');
    res.sendStatus(200);
  });
});

router.get('/user', async (req, res) => {
  try {
    res.json({ name: req.session.login });
  } catch (error) {
    console.log('error', error);
  }
});

module.exports = router;
