var express = require('express');
var router = express.Router();

router.get('/', function (rqs, res) {
  res.render('custom', { title: 'custom' });
});

module.exports = router;
