var express = require('express')
var ejs = require('ejs')
var bodyParser = require('body-parser');
var mysql = require('mysql');
const { query } = require('express');

mysql.createConnection({
    host:"localhost",
    user:"root",
    password:"",
    database:"functionpop"
})


// Create the local server
var app = express();

// Connect (Important !!)
app.use(express.static('public'));
app.set('view engine','ejs');

app.listen(8080);
app.use(bodyParser.urlencoded({extended:true}));

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