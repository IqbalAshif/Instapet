'use strict'
const express = require('express');
const router = express.Router();

router.get('/', (req, res) => {
  console.log('rootRoute: root route with req: ', req.query);
  res.sendFile(`${process.cwd()}/index.html`);
});

router.post('/', (req, res) => {
  console.log('rootRoute: / route with post', req.body);
  res.send('Hello root route with http post');
});

router.put('/', (req, res) => {
  console.log('rootRoute: http put');
  res.send('http put on root route');
});

module.exports = router;
