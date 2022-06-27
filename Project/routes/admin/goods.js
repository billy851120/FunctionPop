const { json } = require('body-parser');
var express = require('express');
var bodyParser = require('body-parser');
var db = require('../../dataBase');
var router = express.Router();
router.use(bodyParser.json());



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



router.get('/register', function (req, res) {
  res.render('admin_register', { title: '後台管理系統' });
});

router.get('/item_all', function (rqs, res) {
  res.render('admin_item_all', { title: '後台管理系統' });
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

//---------------會員註冊

router.post('/register', function (req, res) {
  res.render('admin_register');
  var body = req.body;
  var sql = "INSERT INTO customer_id(cName,cBirth,cgender,cAccount,cPhone,cAddr) values(?,?,?,?,?,?)";    //    向user這個表裡寫入資料
  var data = [body.cName, body.cBirth, body.cgender, body.cAccount, body.cPhone, body.cAddr];
  db.exec(sql, data, function(results, fields){
    console.log(body);

  });
})
//---------------

module.exports = router;
