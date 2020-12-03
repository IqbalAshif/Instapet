'use strict';

const express = require('express');
const router = express.Router();
const passport = require('passport')
const {body} = require('express-validator');
const authController = require('../controllers/authController');


router.post('/login', authController.login);

router.post('/register', authController.register); 

module.exports = router;