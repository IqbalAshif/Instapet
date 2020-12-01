'use strict';
//user route
const express = require('express');
const{body} = require('express-validator');
const userController = require('../controllers/userController');
const router = express.Router();

router.get('/', userController.user_list_get);
router.get('/:id', userController.user_get_by_id);
router.post(
    '/',
    [
        body('name', 'minimum length 3 characters').isLength({min: 3}),
        body('email', 'is not valid email').isEmail(),
        body(
            'passwd',
            'minimum length 8 characters, at least one capital letter'
        ).matches('(?=.*[A-Z]).{8,}'),
    ],
    userController.user_create);
    router.get('/:id', userController.user_get_by_id);

module.exports = router;
