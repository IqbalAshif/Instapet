'use strict';
//root routes (example with get, post and put)
const express = require('express');
const router = express.Router();

router.get('/', (req, res) => {
  console.log('rootRoute: root route with req: ', req.query);
});

router.post('/', (req, res) => {
  
});

router.put('/', (req, res) => {
  console.log('rootRoute: http put');
  res.send('http put on root route');
});

module.exports = router;
