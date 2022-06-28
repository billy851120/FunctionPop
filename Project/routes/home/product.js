
const {json} = require('body-parser');
var express = require('express');
var db = require('../../dataBase');
var router = express.Router();
var session = require('express-session');
var bodyParser = require('body-parser');



router.use(session({secret:"secret"}));
router.use(bodyParser.urlencoded({extended:true}));


router.get('/', function (rqs, res) {
  db.exec('SELECT * FROM products', [], (result, fields) => {
    // console.log(result);
    res.render('shop', { result: result });
  });
});
router.get('/single_product/:id', function (rqs, res) {
  

  db.exec('SELECT * from products WHERE product_id = ?', [rqs.params.id], (rows, fields) => {
      // res.render('single_product', { result:JSON.stringify(rows) });
      // console.log(rows)
      res.render('single_product', { result:rows });
});

  // db.exec('SELECT * FROM products', [], (result, fields) => {
  //   res.render('single_product', { result: result });
  // });
});





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




router.post('/add_to_cart', function(req,res){

    var code = req.body.code;
    var name = req.body.name;
    var image = req.body.image;
    var price = req.body.price;
    var quantity = req.body.quantity;
    var product = {code:code, name:name, image:image, price:price, quantity:quantity};


    if(req.session.cart){
        var cart = req.session.cart;

        if(!isProductInCart(cart,code)){
            // JSON.parse(cart).push(product);
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
    res.redirect('/home/product/add_to_cart');

});

router.get('/add_to_cart',function (req,res) {
    
    var cart = req.session.cart;
    var total = req.session.total;
    console.log(cart,total);


    res.render('shop_cart', {cart:cart, total:total});

});






module.exports = router;
