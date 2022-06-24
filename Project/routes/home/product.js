var express = require('express');
var db = require('../../dataBase');
var router = express.Router();

router.get('/', function (rqs, res) {
  db.exec('SELECT * FROM products', [], (result, fields) => {
    res.render('shop', { result: result });
  });
});
router.get('/single_product', function (rqs, res) {
  db.exec('SELECT * FROM products', [], (result, fields) => {
    res.render('single_product', { result: result });
  });
});

module.exports = router;
