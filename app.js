const express = require('express');
const app = express();
const cors = require('cors');
const errorHandler = require('./_helpers/error.handler');
const createConnection = require('./db_helpers/connection');
require('dotenv').config();
const passport = require('passport');
const Strategy = require('passport-twitter').Strategy;
const port = process.env.PORT;

app.use(cors());
console.log('Now the value for FOO is:', process.env.APP_ENV);

// ! authentication middleware
passport.use(
  new Strategy(
    {
      consumerKey: process.env.API_KEY,
      consumerSecret: process.env.API_SECRET,
      callbackURL: '/oauth/callback',
    },
    function (token, tokenSecret, profile, cb) {
      return cb(null, profile);
    }
  )
);

passport.serializeUser(function (user, cb) {
  cb(null, user);
});

passport.deserializeUser(function (obj, cb) {
  cb(null, obj);
});
app.use(require('morgan')('combined'));
app.use(require('body-parser').urlencoded({ extended: true }));
app.use(
  require('express-session')({
    secret: 'keyboard cat',
    resave: true,
    saveUninitialized: true,
  })
);

app.use(passport.initialize());
app.use(passport.session());

app.get('/login/twitter',
  passport.authenticate('twitter'));
  
app.get('/oauth/callback',
  passport.authenticate('twitter', { failureRedirect: '/login' }),
  function(req, res) {
    res.redirect('/profile');
  });

app.get('/profile', require('connect-ensure-login').ensureLoggedIn(), function (
  req,
  res
) {
  res.send({ user: req.user });
});

app.get('/logout', function (req, res) {
  req.session.destroy(function (err) {
    res.redirect('/');
  });
});





//app.use('/users', require('./_helpers/twitter-auth'));

// * error Handler

app.use(errorHandler);

app.listen(port, () => {
  console.log(`🎊 Server running at http://localhost:${port}`);
});
