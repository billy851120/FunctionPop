var express = require('express');
var router = express.Router();

var indexRouter = require('./home/index');
var customRouter = require('./home/custom');
var shopCartRouter = require('./home/shop_cart');
var memberRouter = require('./home/member');
var productRouter = require('./home/product');
var registerRouters = require('./home/register');

router.use('/', indexRouter);
router.use('/custom', customRouter);
router.use('/shop_cart', shopCartRouter);
router.use('/member', memberRouter);
router.use('/product', productRouter);
router.use('/register', registerRouters);

module.exports = router;
