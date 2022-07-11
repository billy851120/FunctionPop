var express = require('express');
var session = require('express-session');
var shop_cartModel = require('../../models/home/shop_cartStatus');
var shop_cartController = require('../../controller/shop_cartController');
var bodyParser = require('body-parser');
var router = express.Router();
var db = require('../../dataBase');
const { apply } = require('file-loader');
const { async } = require('../../controller/shop_cartController');

// 回到前頁
function redirectBack(req, res, next) {
  res.redirect('back');
}

// 中介程式-------------------------------------------------
router.use(bodyParser.json());
router.use(bodyParser.urlencoded({ extended: true }));
router.use(session({ secret: 'secret' }));
function getUrl(req, res, next) {
  // 登入後返回前頁
  var url = req.originalUrl;
  req.session.url = null;
  req.session.url = url;
  return next();
}

// 查看購物車-----------------------------------------------

router.get('/', getUrl, shop_cartController.shop_cart);
router.post('/', getUrl, shop_cartController.updateCart);

router.post('/q_add', shop_cartController.productAdd);
router.post('/q_sub', shop_cartController.productSub);
router.post('/del', shop_cartController.productDel);

//訂單確認-------------------------------------------

router.get('/orderCheck', shop_cartController.orderCheck);
router.post('/orderCheck/', shop_cartController.newOrder);
// 訂單完成--------------------------------------------
router.get('/orderFinish', getUrl, shop_cartController.orderFinish);

module.exports = router;
