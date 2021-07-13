const express = require('express');
const session = require('express-session');
const morgan = require('morgan');
const cookieParser = require('cookie-parser');
const path = require('path');
const dotenv = require('dotenv');

dotenv.config({path: path.join(__dirname, 'config/.env')});

const app = express();

const welcomeRouter = require('./routes/welcomeRouter');

app.use(morgan('dev'));
app.use(express.static(path.join(__dirname, '/public')));
app.use(express.json());
app.use(express.urlencoded({extended: false}));
app.use(cookieParser(process.env.COOKIE_SECRET));
app.use(
  session({
    resave: false,
    saveUninitialized: false,
    secret: process.env.COOKIE_SECRET,
    cookie: {
      httpOnly: true,
      secure: false,
    },
  }),
);

app.use('/', welcomeRouter);

app.listen(process.env.PORT, () => {
  console.log(`Current app listening at http://localhost:${process.env.PORT}`);
});