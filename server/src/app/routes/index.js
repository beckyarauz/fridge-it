const express = require('express');

const router = express.Router();

const glob = require('glob');
const path = require('path');

glob.sync(__dirname + '/*.js').forEach(function (file) {
  if (file === __dirname + '/index.js') return;

  router.use('/api/', require(path.resolve(file)));
});

router.get('/api/', (req, res, next) => {
  res.json({
    secret: 42
  });
});

module.exports = router;
