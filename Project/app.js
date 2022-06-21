var express = require('express');

// Connect SQL
var mysql = require('mysql')

mysql.createConnection({
    host:"localhost",
    user:"root",
    password:"",
    database:"functionpop"
})

//前台模組
var home = require('./routes/home.js');
// 後台模組
var admin = require('./routes/admin.js');

var app = express();

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

// SQL
app.get('/', function (req,res) {
  
  var con = mysql.createConnection({
    host:"localhost",
    user:"root",
    password:"",
    database:"functionpop"
  })
  
  con.query("SELECT * FROM products",(err,result)=>{
    res.render('home/product',{result:result});
  })
});