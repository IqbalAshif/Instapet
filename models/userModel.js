'use strict';
const pool = require('../database/db');
const promisePool = pool.promise();

const getAllUsers = async () => {
  try {
    const [rows] = await promisePool.execute('SELECT * FROM user');
    return rows;
  } catch (e) {
    console.error('userModel:', e.message);
  }
};

const getUser = async (id) => {
  try {
    console.log('userModel.getUser', id);
    const [
      rows,
    ] = await promisePool.execute('SELECT * FROM user WHERE user_id = ?', [
      id,
    ]);
    return rows[0];
  } catch (e) {
    console.error('userModel:', e.message);
  }
};

const getUserLogin = async (params) => {
  try {
    console.log(params);
    const [rows] = await promisePool.execute(
      'SELECT * FROM user WHERE email = ?;',
      params
    );
    return rows;
  } catch (e) {
    console.log('error', e.message);
  }
};

const addUser = async (req) => {
  try {
    const [
      rows,
    ] = await promisePool.execute(
      'INSERT INTO user (name, email, password) VALUES (?, ?, ?);',
      [req.body.name, req.body.username, req.body.password]
    );
    console.log('userModel insert:', rows);
    return rows.insertId;
  } catch (e) {
    console.error('userModel insertUser:', e);
    return 0;
  }
};

const updateUser = async (id, req) => {
  try {
    const [rows] = await promisePool.query('UPDATE wop_user SET name = ?, email = ?, passwd = ? WHERE user_id = ?;',
        [req.body.name, req.body.username, req.body.passwd, id]);
    console.log('userModel update:', rows);
    return rows.affectedRows === 1;
  } catch (e) {
    return false;
  }
};

const deleteUser = async (id) => {
  try {
    const rows = await promisePool.execute(
      'DELETE FROM user WHERE user_id = ?', [id]);
    return rows.affectedRows ===1;
  }catch(e){
      return false;
  }
};


module.exports = {
  getAllUsers,
  getUser,
  getUserLogin,
  addUser,
  updateUser,
  deleteUser,
};
