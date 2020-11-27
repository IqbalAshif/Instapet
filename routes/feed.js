'use strict'
const express = require('express');
const router = express.Router();


router.get("/:id", userController.user_get);
router.post("/", [
    body('name', 'not valid name').isLength({min:3}),
    body('email', 'not valid email').isEmail(),
    body('passwd', 'not valid password').matches('(?=.*[A-Z]).{8,}')

], 
userController.user_create);



module.exports = router;