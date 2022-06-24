var express = require('express');
var router = express.Router();


var goods = require('./admin/goods.js');


router.use('/goods', goods);

module.exports = router;
