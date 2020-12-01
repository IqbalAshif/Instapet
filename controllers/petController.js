'use strict'
const petModel = require('../models/petModel');

const get_all_pet = async (req, res) => {
    const pets = await petModel.getAllPets();
    res.json(pets);
}

const get_pet_by_id = async(req,res) => {
    const pet  = await petModel.getPetById(req.params.id);
    res.json(pet);
}

module.exports = {
    get_all_pet,
    get_pet_by_id,
}