var express = require('express');
var ejs = require('ejs');
var bodyParser = require('body-parser');
var session = require('express-session');

//前台模組
var home = require('./routes/home.js');
// 後台模組
var admin = require('./routes/admin.js');

var app = express();

app.use(bodyParser.json());
// Web伺服器的靜態檔案置於 public 資料夾
app.use(express.static('public'));

// 指定 esj 為 Express 的畫面處理引擎
app.set('view engine', 'ejs');
app.engine('html', require('ejs').renderFile);
app.set('views', __dirname + '/views');

//前台路由器
app.use('/home', home);
//後台路由器
app.use('/admin', admin);

//預設路由，前台index
// app.use('/', home);

app.listen(3000, function () {
  console.log('run');
});
