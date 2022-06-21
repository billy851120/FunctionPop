var express = require('express');
var router = express.Router();

router.get('/', function (rqs, res) {
  res.render('shop_cart', { title: '購物車' });
});
router.get('/orderCheck', function (rqs, res) {
  res.render('orderCheck', { title: '訂單確認' });
});
module.exports = router;
