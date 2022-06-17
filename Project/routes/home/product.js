var express = require('express');
var router = express.Router();

router.get('/shop', function (rqs, res) {
  res.render('shop', { title: '商品頁面' });
});
router.get('/single_product', function (rqs, res) {
  res.render('single_product', { title: '商品頁面' });
});

module.exports = router;
