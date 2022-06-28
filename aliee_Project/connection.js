const mysql = require('mysql');

// Create Connection
mysql.createConnection({
    host:"localhost",
    user:"root",
    password:"",
    database:"node_project"
});
// TEST
var express = require('express')
var ejs = require('ejs')
var bodyParser = require('body-parser');
var mysql = require('mysql');
const { query } = require('express');

mysql.createConnection({
    host:"localhost",
    user:"root",
    password:"",
    database:"node_project"
})


// Create the loval server
var app = express();

// Connect (Important !!)
app.use(express.static('public'));
app.set('view engine','ejs');

app.listen(8080);
app.use(bodyParser.urlencoded({extended:true}));
app.use(session({secret:"secret"}));

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

// Localhost 8080
app.get('/', function (req,res) {

    var con = mysql.createConnection({
        host:"localhost",
        user:"root",
        password:"",
        database:"functionpop"
    })

    con.query("SELECT * FROM products",(err,result)=>{
        res.render('shop',{result:result});
    })

    // res.send("Hello !! ");
    // res.render('pages/index');
});


app.post('/add_to_cart', function(req,res){

    var code = req.body.code;
    var name = req.body.name;
    var image = req.body.image;
    var price = req.body.price;
    var quantity = req.body.quantity;
    var product = {code:code, name:name, image:image, price:price, quantity:quantity};

    if(req.session.cart){
        var cart = req.session.cart;

        if(!isProductInCart(cart,id)){
            cart.push(product);
        }
    }else{

        req.session.cart = {product};
        var cart = req.session.cart;
    }


    // Calculate total
    calculateTotal(cart,req);

    // return to cart page
    res.redirect('/shop_cart');

});

app.get('/shop_cart',function (req,res) {
    
    var cart = req.session.cart;
    var total = req.session.total;

    res.render('shop_cart', {cart:cart, total:total});

});