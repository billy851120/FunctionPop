var express = require('express');
var db = require('../../dataBase');
var router = express.Router();

router.get('/', function (rqs, res) {
  db.exec('SELECT * FROM products', [], (err, result) => {
    res.render('shop', { result: result });
  });
});
router.get('/single_product', function (rqs, res) {
  res.render('single_product', { title: '商品頁面' });
});

module.exports = router;
