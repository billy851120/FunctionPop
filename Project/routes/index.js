var express = require('express');
var router = express.Router();

router.get('/', function (rqs, res) {
  res.render('index', { title: '首頁' });
});

module.exports = router;
