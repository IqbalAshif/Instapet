'use strict';
const jwt = require('jsonwebtoken');
const passport = require('passport');
const {validationResult} = require('express-validator');
const userModel = require('../models/userModel');
const bcrypt = require('bcryptjs');

const login = (req, res) => {
  // TODO: add passport authentication
  console.log('auth', req.body);
  passport.authenticate('local', { session: false }, (err, user, info) => {
    if (err || !user) {
      return res.status(400).json({
        message: 'Something is not right',
        user: user,
      });
    }
    req.login(user, { session: false }, (err) => {
      if (err) {
        res.send(err);
      }
      // generate a signed  web token with the contents of user object and return it in the response
      const token = jwt.sign(user, 'your_jwt_secret');
      return res.json({ user, token });
    });
  })(req, res);
};

const user_create_post = async (req, res, next) => {
  // Extract the validation errors from a request.
  const errors = validationResult(req);

  if (!errors.isEmpty()) {
    console.log('validation', errors.array());
    return res.status(400).json({errors: errors.array()});
  }
  // TODO: bcrypt password
  const salt = bcrypt.genSaltSync(10);
  const hash = bcrypt.hashSync(req.body.password, salt);
  req.body.password = hash;

  console.log('boodu', req.body);

  if (await userModel.addUser(req)) {
    next();
  } else {
    res.status(400).json({error: 'register error'});
  }
};

const logout = (req, res) => {
  req.logout();
  res.json({message: 'logout'});
};

module.exports = {
  login,
  user_create_post,
  logout,
};
