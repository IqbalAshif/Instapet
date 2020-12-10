const express = require('express');
const likeController = require('../controllers/likeController');
const router = express.Router();

router.get('/:id', likeController.get_like_by_id);
router.post('/liked', likeController.like_create);

module.exports = router;

