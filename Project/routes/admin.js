var express = require('express');
var router = express.Router();

var user = require('./admin/user.js');
var goods = require('./admin/goods.js');

router.use('/user', user);
router.use('/goods', goods);

module.exports = router;
