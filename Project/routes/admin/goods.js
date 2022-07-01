const { json } = require('body-parser');
var express = require('express');
var bodyParser = require('body-parser');
var db = require('../../dataBase');
var router = express.Router();
var events = require(`events`);
var emitter = new events.EventEmitter();
router.use(bodyParser.json());

//------後端MYSQL下指令地方-----------------


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



router.get('/member', function (rqs, res) {
  db.exec('SELECT * FROM customer_id', [], (result, fields) => {
    res.render('admin_member', { data: result });
  });
});


//--------------新增菜單--------------------


router.get('/item_shelf', function (rqs, res) {
  res.render('admin_item_shelf', { title: '後台管理系統' });
});

router.get('/item_shelf', function (req, res) {
  res.render('admin_item_shelf', {})
})
router.post("/item_shelf", function (req, res) {
  var body = req.body; //    監聽資料庫寫入返回的引數
  emitter.on("ok", function () {
    return res.end("新增成功");    //    向前臺返回資料
  });
  emitter.on("false", function () {
    return res.end("新增失敗");    //    向前臺返回資料
  });

  var sql = "insert into products(product_name,product_gender,product_description,product_price) values(?,?,?,?)"; //向user這個表裡寫入資料
  var data = [body.product_name, body.product_gender, body.product_description, body.product_price];
  db.exec(sql, data, function (results, fields, err) {    //    執行sql語句
    if (err) {
      console.log(err.message);    //    輸出資料庫錯誤資訊
      emitter.emit("false");    //    返回失敗
    }
    emitter.emit("ok");    //    返回成功
  });

})

//--------------新增菜單--------------------

//--------------管理員登入------------------

router.get('/login', function (rqs, res) {
  res.render('admin_login', { title: '後台管理系統' });
});

router.post("/login", function (rqs, res) {
  var body = rqs.body;
  emitter.on("false", function () {
    return res.end("資料庫判斷有誤");    //    向前臺返回資料
  });
  emitter.on("ok", function () {
    return res.end("輸入帳密錯誤");    //    向前臺返回資料
  });
  emitter.on("success", function () {
    return res.end("成功");    //    向前臺返回資料
  });

  var sql = "select * from customer_id where cAccount ='" + body.cAccount + "' and cPassword='" + body.cPassword + "';";    //    在資料庫裡面查詢使用者名稱跟密碼
  db.exec(sql, [], function (results, fields, err) {  //    執行sql語句，並返回結果
    console.log("results");
    console.log(sql);
    console.log(results);

    if (err) {
      console.log("資料庫錯誤");
      emitter.emit("false");

      return
    }
    if (results.length == 0) {
      console.log("資料庫裡面沒找到配對的內容返回引數");
      emitter.emit("ok");

    } else {
      console.log("success");
      emitter.emit("success");

    }
  });

})

//--------------管理員登入------------------



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
