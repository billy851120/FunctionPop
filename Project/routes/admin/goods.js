var express = require('express');
var router = express.Router();

router.get('/', function (rqs, res) {
  res.render('admin_goods_index', { title: '後台管理系統' });
});
router.get('/11', function (rqs, res) {
  res.render('admin_goods_11', { title: '後台管理系統' });
});
router.get('/item_all', function (rqs, res) {
  res.render('admin_goods_item_all', { title: '後台管理系統' });
});
router.get('/item_del', function (rqs, res) {
  res.render('admin_goods_item_del', { title: '後台管理系統' });
});
router.get('/item_shelf', function (rqs, res) {
  res.render('admin_goods_item_shelf', { title: '後台管理系統' });
});
router.get('/login', function (rqs, res) {
  res.render('admin_goods_login', { title: '後台管理系統' });
});
router.get('/member', function (rqs, res) {
  res.render('admin_goods_member', { title: '後台管理系統' });
});
router.get('/orderMgat__refund', function (rqs, res) {
  res.render('admin_goods_orderMgat__refund', { title: '後台管理系統' });
});
router.get('/orderMgat_num', function (rqs, res) {
  res.render('admin_goods_orderMgat_num', { title: '後台管理系統' });
});
router.get('/register', function (rqs, res) {
  res.render('admin_goods_register', { title: '後台管理系統' });
});
router.get('/stockMgat_all', function (rqs, res) {
  res.render('admin_goods_stockMgat_all', { title: '後台管理系統' });
});

module.exports = router;
