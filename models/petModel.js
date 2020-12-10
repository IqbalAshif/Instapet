'use strict';
const { ExtractJwt } = require('passport-jwt');
const pool = require('../database/db');
const promisePool = pool.promise();

const getAllPets = async () => {
  try {
    const [
      rows,
    ] = await promisePool.execute(`SELECT pet_id, pet_type, breed, pet.name, age, weight, owner, filename, user_id, user.name AS
        ownername FROM pet LEFT JOIN user ON owner = user_id`);

    return rows;
  } catch (e) {
    console.error('petmodel: ', e.message);
  }
};

const getPetById = async (id) => {
  try {
    const rows = await promisePool.execute(
      'SELECT pet.*, user.name as owner_name FROM pet LEFT JOIN user ON pet.owner = user.user_id WHERE pet.pet_id = ? ',
      [id]
    );
    return rows[0];
  } catch (e) {
    console.error('petModel: ', e.message);
  }
};

const getByUserId = async (user_id) => {
  try {
    const rows = await promisePool.execute(
      'SELECT pet.*, user.name as owner_name FROM pet LEFT JOIN user ON pet.owner = user.user_id WHERE user.user_id = ? ',
      [user_id]
    );
    return rows[0];
  } catch (e) {
    console.error('petModel: ', e.message);
  }
};

const addPet = async (req) => {
  try {
    
    const rows = await promisePool.execute(
      'INSERT INTO pet (pet_type, breed, name, age, weight, owner, filename) VALUES (?, ?, ?, ?, ?, ?, ?); ',
      [
        req.body.pet_type,
        req.body.breed,
        req.body.name,
        req.body.age,
        req.body.weight,
        req.body.owner,
        req.file.filename,
      ]
      
    );
    console.log("DATABASE CHECK",rows,insertId);
    return rows[0].insertId;
  }catch(e){
    console.log(req.body);
      return 0;
  }
};

const updatePet = async (req) => {
    try {
      const rows = await promisePool.execute(
        'UPDATE pet SET type = ?, breed = ?, name = ?, age = ?, weight = ?, owner = ? WHERE pet_id = ?;',
        [
          req.body.type,
          req.body.breed,
          req.body.name,
          req.body.age,
          req.body.weight,
          req.body.owner,
          req.body.id,
        ]
      );
      return rows.affectedRows ===1;
    }catch(e){
        return false;
    }
  };

  const deletePet = async (id) => {
    try {
      const rows = await promisePool.execute(
        'DELETE FROM pet WHERE pet_id = ?', [id]);
      return rows.affectedRows ===1;
    }catch(e){
        return false;
    }
  };

module.exports = {
  getAllPets,
  getPetById,
  getByUserId,
  addPet,
  updatePet,
  deletePet,
};
