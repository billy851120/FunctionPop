const { json } = require('body-parser');
var express = require('express');
var bodyParser = require('body-parser');
var db = require('../../dataBase');
var router = express.Router();
var events = require(`events`);
var emitter = new events.EventEmitter();
router.use(bodyParser.json());
//--------------------------
var path = require("path");
// var dirname=__dirname;    //    指向當前js的路徑
// app.use(express.static(path.join(__dirname, `project`))); 
var dirname = '../admin/goods.js';
// router.use('/admin_login', goods);   //    這裡你能夠直接訪問你的靜態檔案，比如你的index.html
router.use(express.static(path.join('../admin/goods.js', `project`)));   //    這裡你能夠直接訪問你的靜態檔案，比如你的index.html
//------後端MYSQL下指令地方

router.get('/', function (rqs, res) {
  db.exec('SELECT * FROM customer_id', [], (result, fields) => {
    res.render('admin_index', { data: result });
  });
});
router.get('/member', function (rqs, res) {
  db.exec('SELECT * FROM customer_id', [], (result, fields) => {
    res.render('admin_member', { data: result });
  });
});
router.get('/item_all', function (rqs, res) {
  db.exec('SELECT * FROM products', [], (result, fields) => {
    res.render('admin_item_all', { data: result });
  });
});
router.get('/item_shelf', function (rqs, res) {
  db.exec('SELECT * FROM products', [], (result, fields) => {
    res.render('admin_item_shelf', { data: result });
  });
});
// router.get('/login', function (rqs, res) {
//   res.render('admin_login', { title: '後台管理系統' });
// });
router.get("/login", function (req, res) {
  res.render('admin_login', { title: '後台管理系統' });


  console.log("安0 0 0 0 0 0安")
 
  console.log(req.query)
  // console.log(res.query)
  emitter.on("ok", function () {
    return res.end("註冊成功");    //    向前臺返回資料
  });
  emitter.on("false", function () {
    return res.end("使用者名稱已存在");    //    向前臺返回資料
  });
  emitter.on("lastok", function () {
    return res.end("使用者名稱已存在");    //    向前臺返回資料
  });

  var sql = "select * from customer_id where cAccount =' "+ req.query.cAccount +" ' and cPassword='" + req.query.cPassword + "'";    //    在資料庫裡面查詢使用者名稱跟密碼
  db.exec(sql, function (results, fields, err) {  //    執行sql語句，並返回結果
    console.log("results");
    console.log(sql);

    // console.log(results);

    if (err) {
      console.log("第1個錯誤");
      console.log(err.RowDataPacket);
      emitter.emit("false");   //    資料庫錯誤
    }else if (fields == 0) {
      emitter.emit("ok"); 
      console.log("第2個錯誤");   //    資料庫裡面沒找到配對的內容返回引數
    } else {
      emitter.emit("lastok"); 
      console.log("已經成功");    //返回登入成功
    }
  });
  
})
// router.get('/login', function (rqs, res) {
//   res.render('admin_login', { title: '後台管理系統' });
// });



//------後端MYSQL下指令地方

//--------------------------讀檔案--------------------------------


router.get('/item_all', function (rqs, res) {
  res.render('admin_item_all', { title: '後台管理系統' });
});
router.get('/', function (rqs, res) {
  res.render('admin_index', { title: '後台管理系統' });
});
router.get('/item_del', function (rqs, res) {
  res.render('admin_item_del', { title: '後台管理系統' });
});
router.get('/item_shelf', function (rqs, res) {
  res.render('admin_item_shelf', { title: '後台管理系統' });
});
router.get('/login', function (rqs, res) {
  res.render('admin_login', { title: '後台管理系統' });
});
router.get('/member', function (rqs, res) {
  res.render('admin_member', { title: '後台管理系統' });
});
router.get('/orderMgat__refund', function (rqs, res) {
  res.render('admin_orderMgat__refund', { title: '後台管理系統' });
});
router.get('/orderMgat_num', function (rqs, res) {
  res.render('admin_orderMgat_num', { title: '後台管理系統' });
});

router.get('/stockMgat_all', function (rqs, res) {
  res.render('admin_stockMgat_all', { title: '後台管理系統' });
});
//--------------------------讀檔案--------------------------------





module.exports = router;
