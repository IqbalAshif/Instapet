'use strict'
const petModel = require('../models/petModel');
const{validationResult} = require('express-validator');
const {makeThumbnail} = require('../utils/resize');
const {getCoordinates} = require('../utils/imageMeta');

const pets = petModel.pets;

const get_all_pet = async (req, res) => {
    const pets = await petModel.getAllPets();
    res.json(pets);
}

const get_pet_by_id = async(req,res) => {
    const pet  = await petModel.getPetById(req.params.id);
    res.json(pet);
}

const make_thumbnail = async (req, res, next) => {
    try {
      const ready = await makeThumbnail({width: 160, height: 160}, req.file.path,
          './thumbnails/' + req.file.filename);
      if (ready) {
        console.log('make_thumbnail', ready);
        next();
      }
    } catch (e) {
      next();
    }
  };
  

const pet_create = async (req, res) => {
    const errors = validationResult(req);
    if(!errors.isEmpty()){
        console.log('validation', errors.array());
        return res.status(400).json({errors: errors.array()});
    }

    const coords = await getCoordinates(req.file.path);
    console.log('coords', coords);
    req.body.coords = coords;
  
    const id = await petModel.addPet(req);
    const pet = await petModel.getPetById(id);
    res.send(pet);
}

const pet_update = async(req, res) => {
    const updateOk = await petModel.updatePet(req);
    res.json(updateOk);
}

const pet_delete = async(req, res) =>  {
    const deleteOk = await petModel.deletePet(req.params.id);
    res.json(deleteOk);
}


module.exports = {
    get_all_pet,
    get_pet_by_id,
    pet_create,
    pet_update,
    pet_delete,
    make_thumbnail,

}