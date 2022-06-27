var express = require('express');
var db = require('../../dataBase');
var router = express.Router();

router.get('/', function (rqs, res) {
  db.exec('SELECT * FROM products', [], (result, fields) => {
    console.log(result);
    res.render('shop', { result: result });
  });
});
router.get('/single_product/:id', function (rqs, res) {
  

  db.exec('SELECT * from products WHERE product_id = ?', [rqs.params.id], (rows, fields) => {
      // res.render('single_product', { result:JSON.stringify(rows) });
      console.log(rows)
      res.render('single_product', { result:rows });
});


  // db.exec('SELECT * FROM products', [], (result, fields) => {
  //   res.render('single_product', { result: result });
  // });
});

module.exports = router;
