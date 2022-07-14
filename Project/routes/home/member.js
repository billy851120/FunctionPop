var express = require('express');
var router = express.Router();
var db = require('../../dataBase');
var bodyParser = require('body-parser');
var memberController = require('../../controller/memberController');
const { apply } = require('file-loader');

router.use(bodyParser.json());
router.use(
  bodyParser.urlencoded({
    extended: false,
  })
);

// 中介程式-------------------------------------------------
function redirectBack(req, res, next) {
  res.redirect('back');
}

router.use((req, res, next) => {
  if (!req.originalUrl) {
    res.redirect('/home/product/male');
  }
  return next();
});

function getUrl(req, res, next) {
  // 登入後返回前頁
  // var url = req.originalUrl;
  req.session.url = req.originalUrl;
  return next();
}

// 會員登入/登出/註冊-------------------------------------------------
router.get('/login', memberController.login);
router.post('/login', memberController.handlelogin, redirectBack);
router.get('/logout', memberController.logout);

router.get('/register', memberController.register);

router.post('/register', memberController.handleregister);
router.get('/register_success', memberController.registerCheck);

// 會員資料頁面------------以下登入才看得到-------------------------
router.get('/memberData', getUrl, memberController.memberData);
router.post('/memberData', getUrl, memberController.updateMemberData);

router.get('/memberData_changePw', getUrl, memberController.changePw);
router.post(
  '/memberData_changePw',
  getUrl,
  memberController.handlechangePw,
  redirectBack
);

// 訂單詳情-----------------------------------------------------
router.get('/orderList', getUrl, memberController.orderList);
router.get('/orderDetail', getUrl, function (req, res) {
  var url = req.url;
  res.render('member/orderDetail', { title: '會員資料｜訂單內容', url });
});
// 我的最愛-------------------------------------------------

// ----------------------載入------------------------------
router.get('/myFavourite', getUrl, function (req, res) {
  console.log('GGG');
  // console.log(req.session.memberprofile);
  var checkmem = req.session.memberprofile;
  console.log(checkmem != 'null');
  if (checkmem != null) {
    var memid = req.session.memberprofile.id;
    // console.log(checkmem);
    db.exec(
      'SELECT F.customer_id, F.product_id,P.product_gender,P.product_all_id, P.product_code,P.product_name, P.product_image, P.product_description, P.product_price,P.size_name FROM favorite AS F INNER JOIN products_all AS P ON F.product_id = P.product_id WHERE F.customer_id = ?',
      memid,
      function (results, fields, error) {
        // db.exec("SELECT * FROM products_all",[],)
        // console.log(error);
        // console.log(results);
        // console.log(fields);
        if (error) {
          throw error;
          console.log('SSSSSSSSSSSSSSSSSSSSSSSSS');
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
          favorArr: arr,
        });
      }
    );
  } else {
    res.render('member/myFavourite', { title: '會員資料｜我的最愛' });
  }
});

// ----------------------送出------------------------------
router.post('/myFavourite', function (req, res) {
  console.log('post');
  console.log(req.body);
  //  -----全部送到垃圾桶-----------------------------------------
  if (req.body.clearallcontent != null) {
    var memcontent = req.body.memcontent;
    db.exec(
      'DELETE FROM favorite WHERE customer_id = ?',
      [memcontent],
      (err, results) => {
        // if (err) return cb(err);
        // cb(null)
        res.redirect(`/home/member/myFavourite`);
      }
    );
  }
  //  ---垃圾桶------------------------------------------------------
  console.log(`pid : ${req.body.pid}`);
  if (req.body.pid) {
    var cid = parseInt(req.body.cid);
    var pid = parseInt(req.body.pid);
    console.log(typeof pid);
    console.log(pid);
    db.exec(
      'DELETE FROM favorite WHERE product_id = ? and customer_id = ?',
      [pid, cid],
      (results, err) => {
        // console.log(results);
        // console.log(err);
        // res.redirect('/home/member/myFovourite');
        // if (err) return cb(err);
        // cb(null)
      }
    );
  }
  //  ---送進購物車------------------------------------------------------
  console.log('送進購物車');
  console.log(req.body.p_id);
  console.log(req.body.size);
  console.log(req.body.color);

  // res.send(req.body);
});

module.exports = router;
