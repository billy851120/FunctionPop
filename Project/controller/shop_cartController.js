var db = require('../dataBase');
var session = require('express-session');
var shop_cartModel = require('../models/home/shop_cartStatus');

var shop_cartController = {
  shop_cart: (req, res) => {
    var cart = req.session.cart;
    var total = req.session.total;

    db.exec(
      'SELECT * FROM `products` order by product_id DESC',
      [],
      function (result, fields) {
        db.exec(
          'SELECT * FROM `custompic` order by id DESC LIMIT 1',
          [],
          function (custPic, fields) {
            res.render('shop_cart', {
              title: 'f.pop 購物車',
              cart: cart,
              total: total,
              result: result,
              custPic: custPic,
            });
          }
        );
      }
    );
  },

  updateCart: (req, res) => {
    console.log(req.body);
    if (req.body.name == '客製化T恤') {
      db.exec(
        'SELECT * FROM `custompic` order by id DESC LIMIT 1',
        [],
        function (result, fields) {
          var cart = req.session.cart;
          var code = req.body.code;
          var all_id = req.body.all_id;
          var id = req.body.id;
          var name = req.body.name;
          var color = req.body.color;
          var size = req.body.size;
          var image = result[0].pic.toString('base64');
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

          // shop_cartModel.addToCart(cart, req, all_id, quantity, product);
          if (req.session.cart) {
            var cart = req.session.cart;
            if (shop_cartModel.isProductInCart(cart, all_id)) {
              for (let i = 0; i < cart.length; i++) {
                let ct = 0;
                if (cart[i].all_id == all_id) {
                  ct = parseInt(cart[i].quantity) + parseInt(quantity);
                  cart[i].quantity = ct.toString();
                  // console.log(cart);
                }
              }
            } else {
              cart.push(product);
              // console.log(cart);
            }
          } else {
            req.session.cart = [product];

            var cart = req.session.cart;
          }
          //計算總數量
          shop_cartModel.updateCartCount(cart, req);
          // 計算總額
          shop_cartModel.calculateTotal(cart, req);

          // return to cart page
          // res.redirect('back');
          // next();
          res.redirect('back');
        }
      );
    } else {
      var cart = req.session.cart;
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

      // shop_cartModel.addToCart(cart, req, all_id, quantity, product);

      if (req.session.cart) {
        var cart = req.session.cart;
        console.log('CART =');
        console.log(cart);
        if (shop_cartModel.isProductInCart(cart, all_id)) {
          for (let i = 0; i < cart.length; i++) {
            let ct = 0;
            if (cart[i].all_id == all_id) {
              ct = parseInt(cart[i].quantity) + parseInt(quantity);
              cart[i].quantity = ct.toString();
              // console.log(cart);
            }
          }
        } else {
          console.log('else --------->');
          console.log(product);
          console.log('else cart ------------>');
          console.log(cart);
          cart.push(product);
          // console.log(cart);
        }
      } else {
        req.session.cart = [product];
        var cart = req.session.cart;
      }
      //計算總數量
      shop_cartModel.updateCartCount(cart, req);
      // 計算總額
      shop_cartModel.calculateTotal(cart, req);

      // return to cart page
      // res.redirect('back');
      // next();
      res.redirect('back');
    }
    // console.log(req.session.cart);
  },
  // sss: (req, res) => {
  //   console.log(req.session.cart);
  //   var cart = req.session.cart;
  //   var code = req.body.code;
  //   var all_id = req.body.all_id;
  //   var id = req.body.id;
  //   var name = req.body.name;
  //   var color = req.body.color;
  //   var size = req.body.size;
  //   var image = req.body.image;
  //   var price = req.body.price;
  //   var quantity = req.body.quantity;
  //   var product = {
  //     code: code,
  //     all_id: all_id,
  //     id: id,
  //     name: name,
  //     color: color,
  //     size: size,
  //     image: image,
  //     price: price,
  //     quantity: quantity,
  //   };
  //   console.log(product);

  //   res.redirect('back');
  // },
  productAdd: (req, res) => {
    if (req.body.allId) {
      var cart = req.session.cart;
      var all_id = req.body.allId;
      if (shop_cartModel.isProductInCart(cart, all_id)) {
        for (let i = 0; i < cart.length; i++) {
          if (cart[i].all_id == all_id) {
            var qua = parseInt(cart[i].quantity);
            qua++;
            cart[i].quantity = qua.toString();
          }
        }
      }
      shop_cartModel.updateCartCount(cart, req);
      shop_cartModel.calculateTotal(cart, req);

      res.redirect('back');
    }
  },
  productSub: (req, res) => {
    if (req.body.allId) {
      var cart = req.session.cart;
      var all_id = req.body.allId;
      if (shop_cartModel.isProductInCart(cart, all_id)) {
        for (let i = 0; i < cart.length; i++) {
          if (cart[i].all_id == all_id && cart[i].quantity > 1) {
            var qua = parseInt(cart[i].quantity);
            qua--;
            cart[i].quantity = qua.toString();
          }
        }
      }

      shop_cartModel.updateCartCount(cart, req);
      shop_cartModel.calculateTotal(cart, req);
      console.log(req.session.cartCount);
      console.log(req.session.total);
      res.redirect('back');
    }
  },
  productDel: (req, res) => {
    if (req.session.cart) {
      var cart = req.session.cart;
      var del_id = req.body.allId;

      console.log(cart);
      if (shop_cartModel.isProductInCart(cart, del_id)) {
        for (let i = 0; i < cart.length; i++) {
          if (cart[i].all_id == del_id) {
            cart.splice(i, i + 1);
            req.session.cart = cart;
            console.log('已刪除all_id:' + del_id + ' 商品');
          } else {
            console.log(' ');
          }
        }
      } else {
        console.log('err');
      }
    }
    shop_cartModel.updateCartCount(cart, req);
    shop_cartModel.calculateTotal(cart, req);
    res.redirect('back');
  },
  orderCheck: (req, res) => {
    var cart = req.session.cart;
    var total = req.session.total;
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
        res.render('orderCheck', {
          title: 'f.pop 訂單確認',
          o_id: oid,
          cart: cart,
          total: total,
        });
      }
    );
  },
  newOrder: (req, res) => {
    var cart = req.session.cart;
    var total = req.session.total;
    var orderLise = req.body;
    console.log(orderLise);

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
      var to_price = parseInt(item.price) * parseInt(item.quantity).toString();
      console.log(orderLise);
      var sql_order_item =
        'INSERT INTO order_items (order_list,product_id,UnitPrice,Quantity,Discount,user_id ) VALUES(?,?,?,?,?,?); ';
      var data_order_item = [
        orderLise.newOrderList,
        item.all_id,
        to_price,
        item.quantity,
        '0',
        orderLise.email,
      ];
      db.exec(sql_order_item, data_order_item, function (result, fields) {
        console.log('已更新order_items');
      });
      console.log(cart);
    });
    req.session.cart = [];
    req.session.cartCount = 0;
    req.session.total = 0;
    req.session.orderLise = orderLise.newOrderList;

    res.redirect('/home/shop_cart/orderFinish');
  },
  orderFinish: (req, res) => {
    var count = 0;
    db.exec(
      'SELECT * FROM `order_items` WHERE order_list = ?',
      [req.session.orderLise],
      (result, fields) => {
        res.render('orderFinish', {
          title: 'f.pop 完成訂單',
          result: result,
        });
      }
    );

    // console.log(cart);
    // console.log(total);

    console.log('總商品數');
  },
};

module.exports = shop_cartController;
