var express = require('express');
var router = express.Router();

router.get('/frame6', function (rqs, res) {
  res.render('frame6', { title: '會員資料｜我的最愛' });
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
