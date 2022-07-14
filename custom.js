// var express = require('express');
// const multer = require('multer');
// var db = require('../../dataBase');
// var router = express.Router();

// function getUrl(req, res, next) {  // 登入後返回前頁
//   var url = req.originalUrl;
//   req.session.url = null;
//   req.session.url = url;
//   return next();
// }

// router.get('/', getUrl,function (rqs, res) {
//   res.render('custom', { title: 'custom' });
// });

// module.exports = router;
var express = require('express');
const multer = require('multer');
var db = require('../../dataBase');
var router = express.Router();

function getUrl(req, res, next) {  // 登入後返回前頁
  var url = req.originalUrl;
  req.session.url = null;
  req.session.url = url;
  return next();
}

const upload = multer({
  storage: multer.memoryStorage(),
  limits: {
    fileSize: 2 * 1024 * 1024,  // 限制 2 MB
  },
  fileFilter(req, file, callback) {  // 限制檔案格式為 image
    if (!file.mimetype.match(/^image/)) {
      callback(new Error().message = '檔案格式錯誤');
    } else {
      callback(null, true);
    }
  }
});


router.post('/', upload.single('image'), async (req, res, next) => {
  console.log(req.file.buffer);  // 取得檔案
  var buf = req.file.buffer;
  db.exec(`insert into custompic(customerid,pic) values(1,?)`, [req.file.buffer], (result, fields) => {
    console.log(result);
    res.send({
      img:req.file,
      success: true,
      message: '上傳圖片成功'
    });
  });
});


router.get('/', getUrl, function (rqs, res) {
  res.render('custom', { title: 'custom' });
});

module.exports = router;
