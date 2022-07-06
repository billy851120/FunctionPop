var express = require('express');
var router = express.Router();
var db = require('../../dataBase');
var memberController = require('../../controller/memberController');

// 中介程式-------------------------------------------------
function redirectBack(req, res, next) {
  res.redirect('back');
}
function getUrl(req, res, next) {  // 登入後返回前頁
  var url = req.originalUrl;
  req.session.url = null;
  req.session.url = url;
  return next();
}

// 會員登入/登出-------------------------------------------------
router.get('/login', memberController.login);
router.post('/login', memberController.handlelogin, redirectBack);
router.get('/logout', memberController.logout);

// 會員資料頁面------------以下登入才看得到-------------------------
router.get('/memberData', getUrl, memberController.memberData);
router.post('/memberData', getUrl, memberController.updateMemberData);

router.get('/memberData_changePw', getUrl, memberController.changePw)
router.post('/memberData_changePw', getUrl, memberController.handlechangePw, redirectBack);


// 訂單詳情-----------------------------------------------------
router.get('/orderList', getUrl, function (req, res) {
  var url = req.url;
  res.render('member/orderList', { title: '會員資料｜訂單清單', url });
});
router.get('/orderDetail', getUrl, function (req, res) {
  var url = req.url;
  res.render('member/orderDetail', { title: '會員資料｜訂單內容', url });
});
// 我的最愛-------------------------------------------------
router.get('/myFavourite', getUrl, function (req, res) {

  console.log("GGG");
  // console.log(req.session.memberprofile);
  var checkmem = req.session.memberprofile;
  console.log(checkmem != 'null');
  if(checkmem != null){
    var memid = req.session.memberprofile.id;
    // console.log(checkmem);
    db.exec(
      'SELECT F.customer_id, F.product_id, P.product_name, P.product_image, P.product_description, P.product_price FROM favorite AS F INNER JOIN products AS P ON F.product_id = P.product_id WHERE F.customer_id = ?',
      memid,
      function (results, fields, error) {
        // console.log(error);
        // console.log(results);
        // console.log(fields);
        if (error) {
          throw error;
          console.log("SSSSSSSSSSSSSSSSSSSSSSSSS");
        }
        var arr = [];
        for (var i = 0; i < results.length; i++) {
          arr[i] = results[i].product_id;
        }
        // console.log(arr + " get");
        res.render('member/myFavourite', {
          title: '會員資料｜我的最愛',
          // result: results,
          todos: results,
          favorArr: arr
        });

      })
  }else{
  res.render('member/myFavourite', { title: '會員資料｜我的最愛' });
  }
});





module.exports = router; 
