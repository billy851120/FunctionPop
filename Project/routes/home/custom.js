var express = require('express');
var router = express.Router();

function getUrl(req, res, next) {  // 登入後返回前頁
  var url = req.originalUrl;
  req.session.url = null;
  req.session.url = url;
  return next();
}

router.get('/', getUrl,function (rqs, res) {
  res.render('custom', { title: 'custom' });
});

module.exports = router;
