var express = require('express');
var fs = require('fs');
var session = require('express-session');
var bodyParser = require('body-parser');
var router = express.Router();
var db = require('../../dataBase');
router.use(bodyParser.json());

function isProductInCart(cart, all_id) {
  for (let i = 0; i < cart.length; i++) {
    if (cart[i].all_id == all_id) {
      return true;
    }
  }

  return false;
}

function updateCart(cart, req) {
  let count = 0;
  for (let i = 0; i < cart.length; i++) {
    if (cart[i].quantity) {
      count += parseInt(cart[i].quantity);
    } else {
      count += parseInt(cart[i].quantity);
    }
  }
  req.session.cartCount = count.toString();
  return count;
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
  var all_id = req.body.all_id;
  var id = req.body.id;
  var name = req.body.name;
  var color = req.body.color;
  var size = req.body.size;
  var image = req.body.image;
  var price = req.body.price;
  var quantity = req.body.quantity;
  var product = {
    code: code,
    all_id: all_id,
    id: id,
    name: name,
    color: color,
    size: size,
    image: image,
    price: price,
    quantity: quantity,
  };
  // console.log(req.session.cart);

  if (req.session.cart) {
    var cart = req.session.cart;
    if (isProductInCart(cart, all_id)) {
      for (let i = 0; i < cart.length; i++) {
        let ct = 0;
        if (cart[i].all_id == all_id) {
          ct = parseInt(cart[i].quantity) + parseInt(quantity);
          cart[i].quantity = ct.toString();
          console.log(cart);
        }
      }
    } else {
      cart.push(product);
      console.log(cart);
    }
  } else {
    req.session.cart = [product];

    var cart = req.session.cart;
    console.log(cart);
  }
  updateCart(cart, req);
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
  console.log(total);
  // console.log(req.session);

  res.render('shop_cart', { cart: cart, total: total });
});
router.get('/orderCheck', function (rqs, res) {
  db.exec(
    'SELECT * FROM `orders` order by order_id DESC limit 1',
    [],
    function (result, fields) {
      let oid = 0;
      if (!result[0]) {
        oid = 1;
      } else {
        oid = result[0].order_id;
      }
      // console.log(result[0]);
      res.render('orderCheck', { title: '訂單確認', o_id: oid });
    }
  );
});
router.post('/orderCheck/add', function (req, res) {
  var cart = req.session.cart;
  var total = req.session.total;
  var orderLise = req.body;
  // console.log(orderLise);
  // console.log(cart);
  // console.log(total);

  var sql_orders =
    'INSERT INTO orders (order_list,user_name,user_phone,user_email,user_city,user_address 	) VALUES(?,?,?,?,?,?); ';
  var data_orders = [
    orderLise.newOrderList,
    orderLise.name,
    orderLise.phone,
    orderLise.email,
    orderLise.city,
    orderLise.address,
  ];
  db.exec(sql_orders, data_orders, function (result, fields) {
    console.log('新增一筆訂單到orders');
  });
  cart.forEach(function (item, idx) {
    var sql_order_item =
      'INSERT INTO order_items (order_id,order_list,product_id,UnitPrice,Quantity,Discount,user_id 	) VALUES(?,?,?,?,?,?,?); ';
    var data_order_item = [
      '',
      orderLise.newOrderList,
      '',
      item.price,
      item.quantity,
      '',
      orderLise.email,
    ];
    db.exec(sql_order_item, data_order_item, function (result, fields) {
      console.log('已更新order_items');
    });
    console.log(cart);
  });

  res.redirect('/orderFinish');
});
router.get('/orderFinish', function (req, res) {
  var cart = req.session.cart;
  var total = req.session.total;
  var orderLise = req.body;
  // console.log(cart);
  // console.log(total);
  // console.log(orderLise);
  res.render('orderFinish', { title: '訂單完成', cart: cart, total: total });
});

module.exports = router;
