var express = require('express');
var db = require('../../dataBase');
var bodyParser = require('body-parser');
var router = express.Router();
router.use(bodyParser.json());
var events = require(`events`);
var emitter = new events.EventEmitter();
// var dirname = register;    //    指向當前js的路徑
// router.use(express.static(path.join(register, `project`)));


router.get('/', function (req, res) {
  res.render('register', {})
})
router.post("/", function (req, res) {
  // res.render('register',{})//    獲取get的請求的路徑，拿到前臺傳來的引數
  //    建立資料庫連線
  //    連線資料庫
  var body = req.body;
  //    監聽資料庫寫入返回的引數
  emitter.on("ok", function () {
    return res.end("註冊成功");    //    向前臺返回資料
  });
  emitter.on("false", function () {
    return res.end("使用者名稱已存在");    //    向前臺返回資料
  });

  var sql = "insert into customer_id(cName,cBirth,cgender,cAccount,cPhone,cAddr,cPassword) values(?,?,?,?,?,?,?)"; //向user這個表裡寫入資料
  var data = [body.cName, body.cBirth, body.cgender, body.cAccount, body.cPhone, body.cAddr, body.cPassword];
  db.exec(sql, data, function (results, fields, err) {    //    執行sql語句
    if (err) {
      console.log(err.message);    //    輸出資料庫錯誤資訊
      emitter.emit("false");    //    返回失敗
    }
    emitter.emit("ok");    //    返回成功
  });

})


module.exports = router;


