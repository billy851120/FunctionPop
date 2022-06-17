var express = require('express');
var router = express.Router();

router.get('/', function (rqs, res) {
  res.render('shop_cart', { title: '購物車' });
});
module.exports = router;
