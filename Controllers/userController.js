'use strict';

const userModel = require('../models/userModel');
const { validationResult } = require('express-validator');




const user_get = async (req, res) => {
  console.log("userController: http get user with path param", req.params);
  const user = await userModel.getUser(req.params.id);
  res.json(user);
};


const user_create = async (req, res) => {
  //here we will create a user with data coming from req...
  console.log('userController user_create', req.body);
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res.status(400).json({ errors: errors.array() });
  }
  const id = await userModel.addUser(req);
  const user = await userModel.getUser(id);
  res.send(user);
};


module.exports = {
  user_get,
  user_create
};