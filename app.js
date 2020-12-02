'use strict';
const express = require('express');
const cors = require('cors');
const bodyParser = require('body-parser');
const passport = require('./utils/pass.js');
const session = require('express-session');
const rootRoute = require('./routes/rootRoute.js');
const userRoute = require('./routes/userRoute.js');
const petRoute = require('./routes/petRoute.js')
const authRoute = require ('./routes/authRoute.js')
const app = express();
const port = 3000;
const loggedIn = (req, res, next) => {
    if (req.user) {
      next();
    } else {
      res.redirect('/');
    }
  };

app.use(passport.initialize());
app.use(passport.session());

app.use(session({
    secret:'keyboard cat',
    resave:true,
    saveUninitialized:true,
    cookie: {maxAge:60*1000}
}));

app.post('/login',
    passport.authenticate('local', {failureRedirect: '/'}),
    (req, res) => {
      console.log('success');
      res.redirect('/user');
    });

app.get('/secret', loggedIn, (req, res) => {
        res.render('secret');
      });

app.use(cors());
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

app.use(express.static('uploads'));



//routes
app.use('/', rootRoute);
app.use('/auth', authRoute);
app.use('/user', passport.authenticate('jwt', {session: false}), userRoute);
app.use('/pet', passport.authenticate('jwt', {session: false}), petRoute);

app.listen(port, () => console.log(`Example app listening on port ${port}!`));
