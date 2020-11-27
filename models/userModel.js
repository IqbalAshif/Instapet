'use strict';
const pool = require('../database/db');
const promisePool = pool.promise();



const getUser = async (id) => {
  try {
    console.log("userModel getUser", id);
    const [rows] = await promisePool.execute('SELECT * FROM wop_user WHERE user_id = ?', [id]);
    return rows[0];
  } catch (e) {
    console.error("userModel:", e.message);
  }
};

const addUser = async (req) => {
  try {
    const [rows] = await promisePool.query("INSERT INTO wop_user(name, email, password) VALUES(?, ?, ?);",
        [req.body.name, req.body.email, req.body.passwd]);
    console.log('userModel add:', rows);
    return rows.insertId;
  } catch (e) {
    console.error("userModel adduser:", e);
    return 0 ;
  }
};


module.exports = {

  getUser,
  addUser
};