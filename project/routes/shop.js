const express = require('express');

const router = express.Router();

router.get('/', (req, res, next) => {
  res.status(200).send('<h1>Hello from Express!</h1>');
});

module.exports = router;
