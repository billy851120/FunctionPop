var express = require('express');
var router = express.Router();
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
  res.render('orderList', { title: '會員資料｜訂單清單', url });
});
router.get('/orderDetail', getUrl, function (req, res) {
  var url = req.url;
  res.render('orderDetail', { title: '會員資料｜訂單內容', url });
});
// 我的最愛-------------------------------------------------
router.get('/myFavourite', getUrl, function (req, res) {

  res.render('myFavourite', { title: '會員資料｜我的最愛' });
});



module.exports = router; 
