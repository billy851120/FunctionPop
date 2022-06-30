var express = require('express');
var fs = require('fs');
var session = require('express-session');
var bodyParser = require('body-parser');
var router = express.Router();
var db = require('../../dataBase');
router.use(bodyParser.json());

function isProductInCart(cart, id) {
  for (let i = 0; i < cart.length; i++) {
    if (cart[i].id == id) {
      return true;
    }
  }

  return false;
}

function calculateTotal(cart, req) {
  total = 0;
  for (let i = 0; i < cart.length; i++) {
    // if we are offering a discounted price
    if (cart[i].price) {
      total = total + cart[i].price * cart[i].quantity;
    } else {
      total = total + cart[i].price * cart[i].quantity;
    }
  }
  req.session.total = total;
  return total;
}

router.use(session({ secret: 'secret' }));
router.use(bodyParser.urlencoded({ extended: true }));

router.post('/', function (req, res) {
  var code = req.body.code;
  var name = req.body.name;
  var image = req.body.image;
  var price = req.body.price;
  var quantity = req.body.quantity;
  var product = {
    code: code,
    name: name,
    image: image,
    price: price,
    quantity: quantity,
  };

  if (req.session.cart) {
    var cart = req.session.cart;

    if (!isProductInCart(cart, code)) {
      console.log(cart);
      cart.push(product);
    }
  } else {
    req.session.cart = [product];
    var cart = req.session.cart;
  }

  // Calculate total
  calculateTotal(cart, req);

  // return to cart page
  res.redirect('back');
  // res.send('adasda');
  // res.end()
});

router.get('/', function (req, res) {
  var cart = req.session.cart;
  var total = req.session.total;
  // console.log(cart,total);
  // console.log(req.session);

  res.render('shop_cart', { cart: cart, total: total });
});
router.get('/orderCheck', function (rqs, res) {
  db.exec('SELECT * FROM `orders` order by order_id DESC limit 1',[],function(result,fields){
    res.render('orderCheck', { title: '訂單確認',o_id: result[0].order_id });
  })
});
router.post('/orderCheck/add', function (req, res) {
  var cart = req.session.cart;
  var total = req.session.total;
  var orderLise = req.body;
  var date = new Date();
  console.log(orderLise);
  console.log(cart);
  console.log(total);

  var sql =
    'INSERT INTO orders (order_id,user_name,user_phone,user_email,user_city,user_address ,order_update,order_upload	) VALUES(?,?,?,?,?,?,?,?); ';
  var data = [
    '',
    orderLise.name,
    orderLise.phone,
    orderLise.email,
    orderLise.city,
    orderLise.address,
    '',
    "",
  ];

  db.exec(sql, data, function (result, fields) {
    console.log(result);
  });

  res.redirect('back');
});

module.exports = router;
