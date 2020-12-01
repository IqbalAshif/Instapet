'use strict'
const express = require('express');
const multer = require ('multer');
const petController = require('../controllers/petController');
const router = express.Router();
const upload = multer({dest: 'uploads'});

router.get('/', petController.get_all_pet);
router.get('/:id', petController.get_pet_by_id);

module.exports = router;