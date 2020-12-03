'use strict';

const userRoute = require('../routes/userRoute')
const jwt = require('jsonwebtoken');
const passport = require('passport');
const bcrypt = require('bcryptjs')
const { validationResult } = require('express-validator')
const userModel = require('../models/userModel')



const register = async (req, res) => {
  console.log('userController user_create', req.body);

  //const emailExist = await user.findOne();

  //if(emailExist) return res.status(400).send("EMAIL EXISTS");
  //const salt = await bcrypt.genSalt(10);
  //const hashPswd = await bcrypt.hash(req.body.password, salt);

  const error = validationResult(req);
  if (!error.isEmpty()) {
    return res.status(400).json({ errors: errors.array() });
  }
  const id = await userModel.addUser(req);
  const user = await userModel.getUser(id);
  res.send(user);

};






const login = (req, res, next) => {
  // TODO: add passport authenticate
  console.log('auth',  req.body);
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

      // generate a signed son web token with the contents of user object and return it in the response
      const token = jwt.sign(user, 'your_jwt_secret');

      return res.json({user,token});
      //return res.header('authorization', 'Bearer ' + token).redirect('/user');
    });
  })(req, res);
};






module.exports = {
  login,
  register,
 

};
