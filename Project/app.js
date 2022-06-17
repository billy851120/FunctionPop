var express = require('express');

var indexRouter = require('./routes/index');
var customRouter = require('./routes/custom');
var shopCartRouter = require('./routes/shop_cart');
var memberRouter = require('./routes/member');

var app = express();

// Web伺服器的靜態檔案置於 public 資料夾
app.use(express.static('public'));

// 指定 esj 為 Express 的畫面處理引擎
app.set('view engine', 'ejs');
app.engine('html', require('ejs').renderFile);
app.set('views', __dirname + '/views');

app.use('/', indexRouter);
app.use('/custom', customRouter);
app.use('/shop_cart', shopCartRouter);
app.use('/member', memberRouter);

app.listen(3000, function () {
  console.log('run');
});
