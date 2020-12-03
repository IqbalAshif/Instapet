// Controller
'use strict';
const userModel = require('../models/userModel');
const {validationResult } = require('express-validator')
const users = userModel.users;

const user_list_get = async (req, res) => {
  const users = await userModel.getAllUsers();
  res.json(users);
};

const user_get_by_id = async (req, res) => {
  console.log('userController: http get user with path param', req.params);
  const user = await userModel.getUser(req.params.id);
  res.json(user);
};

const user_create = async (req, res) => {
  //here we will create a user with data coming from req...
  console.log('userController user_create', req.body);
  const error = validationResult(req);
  if(!error.isEmpty()){
    return res.status(400).json({errors: errors.array()});
  }
  const id = await userModel.addUser(req);
  const user = await userModel.getUser(id);
  res.send(user);
};

const user_update = async (req, res) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    console.log('validation', errors.array());
    return res.status(400).json({errors: errors.array()});
  }
  const updateOk = await userModel.updateUser(req.params.id, req);
  res.send(updateOk);
};
const user_delete = async (req, res) => {
  const deleteOk = await userModel.deleteUser(req.params.id, req);
  res.send(deleteOk);
};

module.exports = {
  user_list_get,
  user_get_by_id,
  user_create,
  user_update,
  user_delete,

};
