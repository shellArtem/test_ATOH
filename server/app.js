require('@babel/register');

const session = require('express-session');
const FileStore = require('session-file-store')(session);

const cors = require('cors');

const express = require('express');
const logger = require('morgan');
const path = require('path');

const router = require('./routes/index');
const loginRouter = require('./routes/loginRouter');
const clientRouter = require('./routes/clientRouter');

const app = express();
const PORT = 3003;

const sessionConfig = {
  name: 'testATOH',
  store: new FileStore(),
  secret: process.env.SESSION_SECRET ?? 'Секретное слово',
  resave: false,
  saveUninitialized: false,
  cookie: {
    maxAge: 9999999,
    httpOnly: true,
  },
};

app.use(session(sessionConfig));
app.use(logger('dev'));
app.use(express.static(path.join(__dirname, 'public')));
app.use(express.urlencoded({ extended: true }));
app.use(express.json());
app.use(cors({
  origin: true,
  credentials: true }
));

app.use('/', router);
app.use('/login', loginRouter);
app.use('/client', clientRouter)

app.listen(PORT, () => {
  console.log(`Сервер запущен, порт =====>  ${PORT}`);
});
