'use strict';
const likeModel = require('../models/likeModel');

const get_like_by_id = async (req, res) => {
  try {
    const like = await likeModel.getLikeById(req.params.id);
    res.json(like);
  } catch (e) {
    console.log(e.message);
  }
};

const like_create = async (req, res) => {
  try {
    const id = await petModel.addPet(req);
    const pet = await petModel.getPetById(id);
    res.send(pet);
  } catch (e) {
    console.log(e.message);
  }
};

module.exports = {
  get_like_by_id,
  like_create,
};
