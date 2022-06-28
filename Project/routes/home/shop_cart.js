var express = require('express');
var app = express();
var fs = require("fs");
var session = require('express-session');
var bodyParser = require('body-parser');
var router = express.Router();


function isProductInCart(cart,id) {
  for (let i = 0; i < cart.length; i++) {
    if(cart[i].id == id){
        return true;
    }
  }

  return false;
}


function calculateTotal(cart,req) {
    total = 0;
    for(let i = 0 ; i <cart.length; i++){
        // if we are offering a discounted price 
        if(cart[i].price){
            total = total + (cart[i].price*cart[i].quantity);
        }else{
            total = total + (cart[i].price*cart[i].quantity);
        }
    }
    req.session.total = total;
    return total;
}

router.use(session({secret:"secret"}));
router.use(bodyParser.urlencoded({extended:true}));

router.post('/', function(req,res){

    var code = req.body.code;
    var name = req.body.name;
    var image = req.body.image;
    var price = req.body.price;
    var quantity = req.body.quantity;
    var product = {code:code, name:name, image:image, price:price, quantity:quantity};


    if(req.session.cart){
        var cart = req.session.cart;

        if(!isProductInCart(cart,code)){
            console.log(cart) ;
            cart.push(product);
        }
    }else{

        req.session.cart = [product];
        var cart = req.session.cart;
    }


    // Calculate total
    calculateTotal(cart,req);

    // return to cart page
    res.redirect('back');
    // res.send('adasda');
    // res.end()
});

router.get('/',function (req,res) {
    
    var cart = req.session.cart;
    var total = req.session.total;
    console.log(cart,total);
    console.log(req.session);


    res.render('shop_cart', {cart:cart, total:total});

});
router.get('/orderCheck', function (rqs, res) {
  res.render('orderCheck', { title: '訂單確認' });
});
// router.get('/lab',function(rqs,res){
//   res.render('lab',{title:"sss"})
// })

module.exports = router;

