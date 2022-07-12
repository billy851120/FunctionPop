var express = require('express');
var router = express.Router();
var db = require('../../dataBase');

function getUrl(req, res, next) {  // 登入後返回前頁
  var url = req.originalUrl;
  req.session.url = null;
  req.session.url = url;
  return next();
}

router.get('/', getUrl, function (rqs, res) {

  // var min = 1;
  // var max = 69;
  // var temp = Math.floor(Math.random() * (max - min + 1)) + min;
  var arrpro=[];
    // console.log(temp);
    db.exec(
      'SELECT product_image FROM products ORDER BY product_upload DESC LIMIT 0,6;', [], (results,err ) => {
        
        // console.log(err);
        console.log(results);
        console.log(results[0].product_image);
        for(var i =0; i<6;i++){
          arrpro[i]=results[i].product_image
        }
        console.log(arrpro);
        // arrpro[i]=results;
        // if (err) return cb(err);
        // cb(null)
        // res.redirect(`/home/member/myFavourite`);
        res.render('index', { 
          title: '首頁',
          ranpro:arrpro
       });
      }
    );
  
});

module.exports = router;
