var express = require('express');
var session = require('express-session');
var shop_cartModel = require('../../models/home/shop_cartStatus');
var shop_cartController = require('../../controller/shop_cartController');
var bodyParser = require('body-parser');
var router = express.Router();
var db = require('../../dataBase');
const { apply } = require('file-loader');

// 回到前頁
function redirectBack(req, res, next) {
  res.redirect('back');
}

// 中介程式-------------------------------------------------
router.use(bodyParser.json());
router.use(bodyParser.urlencoded({ extended: true }));
router.use(session({ secret: 'secret' }));
router.use((req, res, next) => {  //  登入後返回原本頁面
  var url = req.originalUrl;
  req.session.url = url;
  return next();
})

// 查看購物車-----------------------------------------------

router.get('/', shop_cartController.shop_cart);
router.post('/', shop_cartController.updateCart);

router.post('/q_add', shop_cartController.productAdd, redirectBack);
router.post('/q_sub', shop_cartController.productSub, redirectBack);
router.post('/del', shop_cartController.productDel, redirectBack);

//訂單確認-------------------------------------------

router.get('/orderCheck', shop_cartController.orderCheck);
router.post('/orderCheck', function (req, res) { });
router.post('/orderCheck/add', shop_cartController.newOrder);

// 訂單完成--------------------------------------------
router.get('/orderFinish', shop_cartController.orderFinish);

module.exports = router;
