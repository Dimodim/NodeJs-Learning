const express = require('express');
const path = require('path');

const rootDir = require('../util/path');


const router = express.Router();

router.get('/add-product', (req, res, next) => {
  res.status(200).sendFile(path.join(rootDir, 'views', 'add-product.html'));
});

router.post('/add-product', (req, res, next) => {
  console.log(req.body);
  res.status(200).redirect('/');
});

module.exports = router;
