var express = require('express');
var router = express.Router();
var memberController = require('../../controller/memberController');

function redirectBack(req, res, next) {
  res.redirect('back');
}

router.get('/memberData', memberController.memberData);
router.post('/memberData', memberController.updateMemberData);

router.get('/memberData_changePw', memberController.changePw)
router.post('/memberData_changePw', memberController.handlechangePw, redirectBack);

router.get('/login', memberController.login);
router.post('/login', memberController.handlelogin, redirectBack);

router.get('/logout', memberController.logout);


router.get('/orderList', function (req, res) {
  var url = req.url;
  res.render('orderList', { title: '會員資料｜訂單清單', url });
});
router.get('/orderDetail', function (req, res) {
  var url = req.url;
  res.render('orderDetail', { title: '會員資料｜訂單內容', url });
});
router.get('/myFavourite', function (req, res) {
  var url = req.url;
  res.render('myFavourite', { title: '會員資料｜我的最愛', url });
});


module.exports = router;
