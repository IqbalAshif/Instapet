'use strict'
const express = require('express');
const { body } = require('express-validator');
const multer = require ('multer');
const petController = require('../controllers/petController');
const router = express.Router();

const fileFilter = (req, file, cb) => {
    if (!file.mimetype.includes('image')) {
      return cb(null, false, new Error('not an image'));
    } else {
      cb(null, true);
    }
  };

const upload = multer({dest: 'thumbnails/', fileFilter});

const injectFile = (req, res, next) => {
    if (req.file) {
      req.body.type = req.file.mimetype;
    }
    console.log('inject', req.body);
    next();
  };
  

router.get('/', petController.get_all_pet);

router.post('/',
upload.single('pet'), 
petController.make_thumbnail,
injectFile,
[
    body('pet_type', 'cant be empty').isLength({ min: 1 }),
    body('breed', 'cant be empty').isLength({ min: 1 }),
    body('name', 'cant be empty').isLength({ min: 1 }),
    body('age', 'must be a number').isLength({ min: 1 }).isNumeric(),
    body('weight', 'must be a number').isLength({ min: 1 }).isNumeric(),
    body('owner', 'required').isLength({ min: 1 }).isNumeric(),
    body('type', 'not image').contains('image'),
],
petController.pet_create);

router.get('/:id', petController.get_pet_by_id);

router.put('/', 
[
    body('pet_type', 'cannot be empty').isLength({min: 1}),
    body('breed', 'cannot be empty').isLength({min: 1}),
    body('name', 'cannot be empty').isLength({min: 1}),
    body('age', 'must be a number').isLength({min: 1}).isNumeric(),
    body('weight', 'must be a number').isLength({min: 1}).isNumeric(),
    body('owner', 'required').isLength({min: 1}).isNumeric(),
],
petController.pet_update);

router.delete('/:id', petController.pet_delete);


module.exports = router;