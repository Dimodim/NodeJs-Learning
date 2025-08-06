const express = require("express");

const router = express.Router();
const rootDir = require('../util/path');
const path = require('path');



router.use((req, res) => {
  res.status(200).sendFile(path.join(rootDir, 'views', '404.html'));

});

module.exports = router;
