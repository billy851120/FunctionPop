var express = require('express');
var bodyParser = require('body-parser');
var session = require('express-session');
var flash = require('connect-flash');
var app = express();
var moment = require('moment');
var shortDataFormat = 'YYYY-MM-DD hh:mm:ss';



app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());
app.use(session({ secret: 'keyboard cat', resave: false, saveUninitialized: true }));
app.use(flash());
app.use((req, res, next) => {
  res.locals.isLogin = req.session.isLogin;
  res.locals.username = req.session.username;
  res.locals.nickname = req.session.nickname;
  res.locals.errorMessage = req.flash('errorMessage');
  // 將 moment 和 shortDateFormat 放到 locals 全域環境中
  res.locals.moment = moment;
  res.locals.shortDataFormat = shortDataFormat;
  next();
});




//前台模組
var home = require('./routes/home.js');
// 後台模組
var admin = require('./routes/admin.js');
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
app.use('/', home);

app.listen(3000, function () {
  console.log('run');
});
