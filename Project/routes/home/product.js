const { json } = require('body-parser');
var express = require('express');
var db = require('../../dataBase');
var router = express.Router();
var session = require('express-session');
var bodyParser = require('body-parser');

router.use(
  session({
    secret: 'secret',
    name: 'product',
  })
);
router.use(bodyParser.urlencoded({ extended: true }));
router.use((req, res, next) => {  //  登入後返回原本頁面
  var url = req.originalUrl;
  req.session.url = url;
  return next();
})
// Female Product

router.get('/:gender', function (rqs, res) {
  db.exec(
    'SELECT * FROM products WHERE product_gender = ?',
    [rqs.params.gender],
    (result, fields) => {
      // console.log(result);
      res.render('shop', { result: result });
    }
  );
});

// Male Product

// router.get('/Male', function (rqs, res) {
//   db.exec('SELECT * FROM products WHERE product_gender = "Male"', [], (result, fields) => {
//     // console.log(result);
//     res.render('shop', { result: result });
//   });
// });

// Gender
router.get('/:gender/single_product/:id', function (rqs, res) {
  var cartCount = rqs.session.cartCount;

  db.exec(
    'SELECT * from products_all WHERE product_id = ?',
    [rqs.params.id],
    (rows, fields) => {
      res.render('single_product', { result: rows, cartCount: cartCount });
    }
  );
});

// Male

// router.get('/Male/single_product/:id', function (rqs, res) {

//   db.exec('SELECT * from products WHERE product_id = ?', [rqs.params.id], (rows, fields) => {
//       res.render('single_product', { result:rows });
// });
// });

// Female

// router.get('/Female/single_product/:id', function (rqs, res) {

//   db.exec('SELECT * from products WHERE product_id = ?', [rqs.params.id], (rows, fields) => {
//       res.render('single_product', { result:rows });
// });
// });

//
//
//

// 1.1 Male Product shirts
router.get('/Male/%E4%B8%8A%E8%A1%A3', function (rqs, res) {
  db.exec(
    'SELECT * FROM products WHERE product_gender = "Male" AND product_category = "上衣"',
    [],
    (result, fields) => {
      res.render('shop', { result: result });
    }
  );
});

router.get('/Male/shirts/single_product/:id', function (rqs, res) {
  db.exec(
    'SELECT * from products WHERE product_id = ?',
    [rqs.params.id],
    (rows, fields) => {
      res.render('single_product', { result: rows });
    }
  );
});

// 1.2 Male Product pants
router.get('/Male/%E4%B8%8B%E8%91%97', function (rqs, res) {
  db.exec(
    'SELECT * FROM products WHERE product_gender = "Male" AND product_category = "下著"',
    [],
    (result, fields) => {
      res.render('shop', { result: result });
    }
  );
});

router.get('/Male/pants/single_product/:id', function (rqs, res) {
  db.exec(
    'SELECT * from products WHERE product_id = ?',
    [rqs.params.id],
    (rows, fields) => {
      res.render('single_product', { result: rows });
    }
  );
});

// 1.3 Male Product bags
router.get('/Male/%E5%8C%85', function (rqs, res) {
  db.exec(
    'SELECT * FROM products WHERE product_gender = "Male" AND product_category = "包"',
    [],
    (result, fields) => {
      res.render('shop', { result: result });
    }
  );
});

router.get('/Male/bags/single_product/:id', function (rqs, res) {
  db.exec(
    'SELECT * from products WHERE product_id = ?',
    [rqs.params.id],
    (rows, fields) => {
      res.render('single_product', { result: rows });
    }
  );
});

// 1.4 Male Product shoes
router.get('/Male/%E9%9E%8B', function (rqs, res) {
  db.exec(
    'SELECT * FROM products WHERE product_gender = "Male" AND product_category = "鞋"',
    [],
    (result, fields) => {
      res.render('shop', { result: result });
    }
  );
});

router.get('/Male/shoes/single_product/:id', function (rqs, res) {
  db.exec(
    'SELECT * from products WHERE product_id = ?',
    [rqs.params.id],
    (rows, fields) => {
      res.render('single_product', { result: rows });
    }
  );
});

// 2.1 Female Product shirts
router.get('/Female/%E4%B8%8A%E8%A1%A3', function (rqs, res) {
  db.exec(
    'SELECT * FROM products WHERE product_gender = "Female" AND product_category = "上衣"',
    [],
    (result, fields) => {
      res.render('shop', { result: result });
    }
  );
});

router.get('/Female/single_product/:id', function (rqs, res) {
  db.exec(
    'SELECT * from products WHERE product_id = ?',
    [rqs.params.id],
    (rows, fields) => {
      res.render('single_product', { result: rows });
    }
  );
});

// 2.2 Female Product dresses
router.get('/Female/%E6%B4%8B%E8%A3%9D', function (rqs, res) {
  db.exec(
    'SELECT * FROM products WHERE product_gender = "Female" AND product_category = "洋裝"',
    [],
    (result, fields) => {
      res.render('shop', { result: result });
    }
  );
});

router.get('/Female/single_product/:id', function (rqs, res) {
  db.exec(
    'SELECT * from products WHERE product_id = ?',
    [rqs.params.id],
    (rows, fields) => {
      res.render('single_product', { result: rows });
    }
  );
});

// 2.3 Female Product skirts
router.get('/Female/%E8%A3%99%E5%AD%90', function (rqs, res) {
  db.exec(
    'SELECT * FROM products WHERE product_gender = "Female" AND product_category = "裙子"',
    [],
    (result, fields) => {
      res.render('shop', { result: result });
    }
  );
});

router.get('/Female/single_product/:id', function (rqs, res) {
  db.exec(
    'SELECT * from products WHERE product_id = ?',
    [rqs.params.id],
    (rows, fields) => {
      res.render('single_product', { result: rows });
    }
  );
});

// 2.4 Female Product skirts
router.get('/Female/%E9%9E%8B', function (rqs, res) {
  db.exec(
    'SELECT * FROM products WHERE product_gender = "Female" AND product_category = "鞋"',
    [],
    (result, fields) => {
      res.render('shop', { result: result });
    }
  );
});

router.get('/Female/single_product/:id', function (rqs, res) {
  db.exec(
    'SELECT * from products WHERE product_id = ?',
    [rqs.params.id],
    (rows, fields) => {
      res.render('single_product', { result: rows });
    }
  );
});

// 2.5 Female Product hats
router.get('/Female/%E5%B8%BD%E5%AD%90', function (rqs, res) {
  db.exec(
    'SELECT * FROM products WHERE product_gender = "Female" AND product_category = "帽子"',
    [],
    (result, fields) => {
      res.render('shop', { result: result });
    }
  );
});

router.get('/Female/single_product/:id', function (rqs, res) {
  db.exec(
    'SELECT * from products WHERE product_id = ?',
    [rqs.params.id],
    (rows, fields) => {
      res.render('single_product', { result: rows });
    }
  );
});

module.exports = router;
