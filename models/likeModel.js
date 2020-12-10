'use strict';
const pool = require('../database/db');
const promisePool = pool.promise();

const like_create = async (req) => {
    try {
      console.log('likeModel createUserLike id: ', req.body);
      const [rows] = await promisePool.execute(
          `INSERT INTO like_post (post_id, liker_id, liked) 
          VALUES(?, ?, ?)`,
          [
            req.body.post_id,
            req.body.liker_id,
            req.body.liked
        ],
      );
      return rows;
    } catch (err) {
      console.error(err.message);
    }
  };

  const getLikeById = async (id) => {
    try {
      const [rows] = await promisePool.execute(
          'SELECT SUM(liked) AS like,' +
          '        post_id' +
          'FROM    like_post' +
          'WHERE post_id = ?'
           , [id]);
      return rows;
    } catch (e) {
      console.error('likeMode-', e.message);
    }
  };

  module.exports = {
  like_create,
  getLikeById,
  };
