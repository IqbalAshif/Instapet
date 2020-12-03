// Controller
'use strict';
const userModel = require('../models/userModel');


const user_list_get = async (req, res) => {
  const users = await userModel.getAllUsers();
  res.json(users);
};

const user_get_by_id = async (req, res) => {
  console.log('userController: http get user with path param', req.params);
  const user = await userModel.getUser(req.params.id);
  res.json(user);
};



module.exports = {
  user_list_get,
  user_get_by_id,
};
