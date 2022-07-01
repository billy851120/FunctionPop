var express = require('express');
var router = express.Router();
var memberController=require('../../controller/memberController');

function redirectBack(req, res, next) {
  res.redirect('back');
}

router.get('/memberData', memberController.memberData);
router.post('/memberData',memberController.updateMemberData);

router.get('/memberData_changePw',memberController.changePw)
router.post('/memberData_changePw',memberController.handlechangePw,redirectBack);

router.get('/login',memberController.login);

router.post('/login',memberController.handlelogin,redirectBack);

router.get('/logout',memberController.logout);


router.get('/memberData', function (rqs, res) {
  res.render('memberData', { title: '會員資料｜我的最愛' });
});
router.get('/frame7', function (rqs, res) {
  res.render('frame7', { title: '會員資料｜我的最愛' });
});
router.get('/frame8', function (rqs, res) {
  res.render('frame8', { title: '會員資料｜我的最愛' });
});
router.get('/frame9', function (rqs, res) {
  res.render('frame9', { title: '會員資料｜我的最愛' });
});
router.get('/test3', function (rqs, res) {
  res.render('test3', { title: '會員資料｜我的最愛' });
});

module.exports = router;
