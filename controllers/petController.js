'use strict'
const petModel = require('../models/petModel');
const{validtionResult, validationResult} = require('express-validator');

const pets = petModel.pets;

const get_all_pet = async (req, res) => {
    const pets = await petModel.getAllPets();
    res.json(pets);
}

const get_pet_by_id = async(req,res) => {
    const pet  = await petModel.getPetById(req.params.id);
    res.json(pet);
}

const get_pets_by_user_id = async(req,res) => {
    const pets  = await petModel.getByUserId(req.params.id);
    res.json(pets);
    console.log('all my pets:', pets);
}

const pet_create = async (req, res) => {
    const errors = validationResult(req);
    if(!errors.isEmpty()){
        console.log('validation', errors.array());
        return res.status(400).json({errors: errors.array()});
    }
    
    const id = await petModel.addPet(req);
    console.log("petreq:",id);
    const pet = await petModel.getPetById(id);
    res.send(pet);
}

const pet_update = async(req, res) => {
    const updateOk = await petModel.updatePet(req);
    res.json(updateOk);
}

const pet_delete = async(req, res) =>  {
    const deleteOk = await catModel.deletePet(req.params.id);
    res.json(deleteOk);
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

module.exports = {
    get_all_pet,
    get_pet_by_id,
    get_pets_by_user_id,
    pet_create,
    pet_update,
    pet_delete,
    make_thumbnail

}