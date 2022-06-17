var express = require('express');
var router = express.Router();

router.get('/', function (rqs, res) {
  res.render('admin_user_index', { title: '後台管理系統' });
});
router.get('/lab_01', function (rqs, res) {
  res.render('admin_user_lab_01(orderby)', { title: '後台管理系統' });
});
router.get('/lab_02', function (rqs, res) {
  res.render('admin_user_lab_02(choose)', { title: '後台管理系統' });
});
router.get('/lab_03', function (rqs, res) {
  res.render('admin_user_lab_03(delete)', { title: '後台管理系統' });
});
router.get('/lab', function (rqs, res) {
  res.render('admin_user_lab', { title: '後台管理系統' });
});
router.get('/login_page', function (rqs, res) {
  res.render('admin_user_login_page', { title: '後台管理系統' });
});
router.get('/server_side', function (rqs, res) {
  res.render('admin_user_server_side', { title: '後台管理系統' });
});

module.exports = router;
