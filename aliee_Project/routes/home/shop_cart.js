var express = require('express');
var app = express();
var fs = require("fs");
var session = require('express-session');
var bodyParser = require('body-parser');
var router = express.Router();

router.use(session({secret:"secret"}));
router.use(bodyParser.urlencoded({extended:true}));


// app.post('/cart', (req, res) => {
//     // fs.readFile(CART_DATA_FILE, (err, data) => {
//     //   const cartProducts = JSON.parse(data);
//     //   const newCartProduct = {
//     //     id: req.body.id,
//     //     title: req.body.title,
//     //     description: req.body.description,
//     //     price: req.body.price,
//     //     image_tag: req.body.image_tag,
//     //     quantity: 1
//     //   };
//     //   let cartProductExists = false;
//     //   cartProducts.map((cartProduct) => {
//     //     if (cartProduct.id === newCartProduct.id) {
//     //       cartProduct.quantity++;
//     //       cartProductExists = true;
//     //     }
//     //   });
//     //   if (!cartProductExists) cartProducts.push(newCartProduct);
//     //   fs.writeFile(CART_DATA_FILE, JSON.stringify(cartProducts, null, 4), () => {
//     //     res.setHeader('Cache-Control', 'no-cache');
//     //     res.json(cartProducts);
//     //   });
//     // });

//     console.log('123');
//   });

  

// router.get('/', function (rqs, res) {
//   var cart = rqs.session.cart;
//     var total = rqs.session.total;
//     console.log(cart,total)

//     res.render('shop_cart', {cart:cart, total:total});
// });
router.get('/orderCheck', function (rqs, res) {
  res.render('orderCheck', { title: '訂單確認' });
});
router.get('/lab',function(rqs,res){
  res.render('lab',{title:"sss"})
})

module.exports = router;

