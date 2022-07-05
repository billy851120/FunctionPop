var express = require('express');
var router = express.Router();

router.use((req, res, next) => {  //  登入後返回原本頁面
  var url = req.originalUrl;
  req.session.url = url;
  return next();
})

router.get('/', function (rqs, res) {
  res.render('index', { title: '首頁' });
});

module.exports = router;
