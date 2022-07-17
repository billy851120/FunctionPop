const { json } = require('body-parser');
var express = require('express');
var db = require('../../dataBase');
var router = express.Router();
var session = require('express-session');
var bodyParser = require('body-parser');
const { defaultFormatUtc } = require('moment');

function getUrl(req, res, next) {  // 登入後返回前頁
  var url = req.originalUrl;
  req.session.url = null;
  req.session.url = url;
  return next();
}

router.use(
  session({
    secret: 'secret',
    name: 'product',
  })
);

router.use(bodyParser.urlencoded({ extended: true }));

router.use(bodyParser.json())

var sqlpost = 'SELECT F.customer_id, F.product_id, P.product_name, P.product_image, P.product_description, P.product_price FROM favorite AS F INNER JOIN products AS P ON F.product_id = P.product_id WHERE F.customer_id = ?';

// router.post('/like', function (rqs, res) {
//   console.log("QQQQQ");
//   // console.log(rqs.body.memid);
//   db.exec(
//     sqlpost,
//     rqs.body.memid,
//     function (results, fields, error) {
//       if (error) {
//         throw error;
//         console.log("RRRRRRRRRRR");
//       }
//       var arr = [];
//       for (var i = 0; i < results.length; i++) {
//         arr[i] = results[i].product_id;
//       }
//       // console.log(arr);

//       // res.render('shop', {
//       //   result: results[0],
//       //   // todos: results[1],
//       //   favorArr: arr
//       // })
//       var gender = rqs.params.gender;
//       const content = parseInt(rqs.body.content);
//       const memid = parseInt(rqs.body.memid);
//       // console.log(rqs.body.content);
//       // console.log(!(rqs.body.content));
//       // console.log(!!(rqs.body.content));
//       if (rqs.body.content) {
//         console.log(arr + " post");
//         if (arr.includes(content)) {
//           console.log("true")
//           db.exec(
//             'DELETE FROM favorite WHERE product_id = ? and customer_id = ?', [content,memid], (results, err) => {
//               // console.log(results);
//               // console.log(err);
//               // res.redirect('/');
//               // res.redirect(`/home/product/${gender}`);
//               res.redirect(`back`);
//               // if (err) return cb(err);
//               // cb(null)

//             }
//           );
//         } else {
//           console.log("555")
//           db.exec(
//             'INSERT INTO favorite VALUES(?,?)', [memid,content], (results, err) => {
//               // console.log(results);
//               // console.log(err);
//               // res.redirect('/');
//               // res.redirect(`/home/product/${gender}`);
//               res.redirect(`back`);

//               // if (err) return cb(err);
//               // cb(null)
//             }

//           );
//         }
//       }

//       //  res.redirect('/:gender');


//     })
// })

// router.get('/todos', todoController.getAll)
// router.get('/female', todoController.addTodo)

// Female Product

router.post('/like', (req, res) => {

  console.log('in post');
  // console.log(content);
  // console.log(memid);
  var data = JSON.parse(JSON.stringify(req.body));
  console.log(data.product_id);
  console.log(data.c_id);
  var content = parseInt(data.product_id);  // product_id
  var memid = data.c_id;  // customer_id

  db.exec('SELECT F.customer_id, F.product_id FROM favorite AS F INNER JOIN products AS P ON F.product_id = P.product_id WHERE F.customer_id = ?',
    [memid],
    (result, fields, error) => {
      var heart_ed = [];
      for (var i = 0; i < result.length; i++) {  // 找出所有已按的愛心
        heart_ed.push(result[i].product_id);
      }
      console.log('目前有的愛心');
      console.log(heart_ed);
      if (!heart_ed.includes(content)) {  // 按的愛心如果不在陣列就加入陣列
        db.exec('INSERT INTO favorite VALUES(?,?)',
          [memid, content],
          (pushHeart, fields, error) => {
            console.log('--------pushHeart result----------');
            heart_ed.push(content);
            console.log(heart_ed);
            res.send(JSON.stringify(pushHeart));
          })
       
        
      } else {  // 把已存在的愛心刪除
        db.exec('DELETE FROM favorite WHERE product_id = ? and customer_id = ?',
        [content, memid],
        (delHeart, fields, error) => {
          console.log('--------delHeart result----------')
          heart_ed = heart_ed.filter(function(item) {return item!== content});
          console.log(heart_ed);
        })

      }

    })

})

var sql = `
SELECT * FROM products WHERE product_gender = ? ORDER BY product_upload DESC;
SELECT F.customer_id, F.product_id, P.product_name, P.product_image, P.product_description, P.product_price FROM favorite AS F INNER JOIN products AS P ON F.product_id = P.product_id WHERE F.customer_id = ?;`;

router.get('/:gender', getUrl, function (rqs, res) {
  var url = rqs.url;
  console.log("123");
  console.log(url);
  var mem_customer_id = 0;
  // console.log(rqs.session.memberprofile.id);
  if (rqs.session.memberprofile == null) {
    mem_customer_id = 0;
  } else {
    mem_customer_id = rqs.session.memberprofile.id;
  }
  db.exec(sql, [rqs.params.gender, mem_customer_id],
    function (results, fields, error) {
      // console.log(error);
      // console.log(results);
      // console.log(fields);
      if (error) {
        throw error;
        console.log("SSSSSSSSSSSSSSSSSSSSSSSSS");
      }
      var arr = [];
      for (var i = 0; i < results[1].length; i++) {
        arr[i] = results[1][i].product_id;
      }
      console.log(arr + " get");
      res.render('shop', {
        result: results[0],
        favorArr: arr
      });
      // console.log(results[0]);
      // console.log(results[1]);
    })
});
router.post("/ddddddd", function (req, res) {
  var sql = "";
  if (req.body.sel == "DESC") {
    sql = "SELECT * FROM products WHERE product_gender ='Male' ORDER BY product_upload DESC";

  } else if (req.body.sel == "ASC") {
    sql = "SELECT * FROM products WHERE product_gender ='Male' ORDER BY product_upload ";

  } else { }
  db.exec(sql, [], function (result, fields) {
    console.log(result);
  })
})


// New Gender Product

// router.get('/:gender', function (rqs, res) {
//   var  sql = `
//   SELECT * FROM products WHERE product_gender = ?;
//   SELECT F.customer_id, F.product_id, P.product_name, P.product_image, P.product_description, P.product_price FROM favorite AS F INNER JOIN products AS P ON F.product_id = P.product_id WHERE F.customer_id = ?';
//   SELECT COUNT(*) AS countAll FROM products WHERE product_gender = ?;
//   SELECT * FROM products ORDER BY product_price DESC WHERE product_gender = ?;
//   SELECT * FROM products ORDER BY product_price WHERE product_gender = ?;
//   SELECT * FROM products ORDER BY product_rating DESC WHERE product_gender = ?;
//   SELECT * FROM products ORDER BY product_rating WHERE product_gender = ?;
//   SELECT * FROM products ORDER BY product_update DESC WHERE product_gender = ?;
//   SELECT * FROM products ORDER BY product_update WHERE product_gender = ?;`;

//   // var url =rqs.url;
//   //   console.log("DDDD");
//   //   var mem_customer_id = 0;
//   //   // console.log(rqs.session.memberprofile.id);
//   //   if(rqs.session.memberprofile == null){
//   //     mem_customer_id = 0;
//   //   }else{
//   //     mem_customer_id = rqs.session.memberprofile.id;
//   //   }

//     db.exec(
//       sql,
//       [],
//       function (results, fields) {
//         // console.log(error);
//         // console.log(results);
//         // console.log(fields);
//         // if (error) {
//         //   throw error;
//         //   console.log("SSSSSSSSSSSSSSSSSSSSSSSSS");
//         // }
//         // var arr = [];
//         // for (var i = 0; i < results[1].length; i++) {
//         //   arr[i] = results[1][i].product_id;
//         // }
//         // console.log(arr + " get");
//         res.render('shop', {
//           result: results[0][0],
//           Count_Product: results[2][0].COUNT,
//           Sort_PriceHL: results[3][0],
//           Sort_PriceLH: results[4][0],
//           Sort_RatingHL: results[5][0],
//           Sort_RatingLH: results[6][0],
//           Sort_DateNO: results[7][0],
//           Sort_dateON: results[8][0],
//           // todos: results[1],
//           // favorArr: arr
//         });
//         // console.log(results[0]);
//         // console.log(results[1]);
//       })
//     })















// Male Product

// router.get('/Male', function (rqs, res) {
//   db.exec('SELECT * FROM products WHERE product_gender = "Male"', [], (result, fields) => {
//     // console.log(result);
//     res.render('shop', { result: result });
//   });
// });

// Single Product Page & Rating DESC
// router.get('/:gender/single_product/:id', getUrl, function (rqs, res) {

//   db.exec(
//     'SELECT * from products_all WHERE product_id = ?',
//     [rqs.params.id],
//     (rows, fields) => {
//       db.exec(`SELECT * FROM products ORDER BY product_rating DESC;`,
//       [],(pro,sss)=>{
//         res.render('single_product', { result: rows ,pro:pro});

//       })

//     }
//   );
// });


router.get('/:gender/single_product/:id', getUrl, function (rqs, res) {

  db.exec(
    'SELECT * from products_all WHERE product_id = ?',
    [rqs.params.id],
    (rows, fields) => {
      var sqlpro = `
      SELECT * FROM products ORDER BY product_price LIMIT 7;
      SELECT * FROM products ORDER BY Rand() LIMIT 4;`;
      db.exec(sqlpro, [], function (pro, kkk) {
        res.render('single_product', {
          result: rows,
          pro: pro[0],
          pro2: pro[1]
        })
        // console.log(results);
      })
    }
  )


  //   var sql = `
  //   SELECT COUNT(*) AS COUNT FROM products;
  //   SELECT * FROM products ORDER BY products.product_upload DESC;
  //   SELECT * FROM products_all order by product_id DESC limit 1;`;
  //   db.exec(sql, [], function (results, fields) {
  //     res.render('admin_item_all', {
  //       total: results[0][0].COUNT,
  //       data2: results[1],
  //       pall_id :results[2][0]
  //     })
  //   })
})

















// Male

// router.get('/Male/single_product/:id', function (rqs, res) {

//   db.exec('SELECT * from products WHERE product_id = ?', [rqs.params.id], (rows, fields) => {
//       res.render('single_product', { result:rows });
// });
// });

// Female

// router.get('/Female/single_product/:id', function (rqs, res) {

//   db.exec('SELECT * from products WHERE product_id = ?', [rqs.params.id], (rows, fields) => {
//       res.render('single_product', { result:rows });
// });
// });

//
//
//

// 1.1 Male Product shirts
router.get('/Male/%E4%B8%8A%E8%A1%A3', getUrl, function (rqs, res) {
  var mem_customer_id = 0;
  // console.log(rqs.session.memberprofile.id);
  if (rqs.session.memberprofile == null) {
    mem_customer_id = 0;
  } else {
    mem_customer_id = rqs.session.memberprofile.id;
  }
  db.exec(
    'SELECT * FROM products WHERE product_gender = "Male" AND product_category = "上衣" ORDER BY product_upload DESC;SELECT F.customer_id, F.product_id, P.product_name, P.product_image, P.product_description, P.product_price FROM favorite AS F INNER JOIN products AS P ON F.product_id = P.product_id WHERE F.customer_id = ?;',
    [mem_customer_id],
    (results, fields) => {
      var arr = [];
      for (var i = 0; i < results[1].length; i++) {
        arr[i] = results[1][i].product_id;
      }
      console.log(arr + " get");
      res.render('shop', {
        result: results[0],
        favorArr: arr
      });

    }
  );
});

router.get('/Male/shirts/single_product/:id', function (rqs, res) {
  db.exec(
    'SELECT * from products WHERE product_id = ?',
    [rqs.params.id],
    (rows, fields) => {
      db.exec('SELECT * FROM products ORDER BY product_update DESC;',
        [], (pro, sss) => {
          res.render('single_product', { result: rows, pro: pro });

        })

    }
  );
});

// 1.2 Male Product pants
router.get('/Male/%E4%B8%8B%E8%91%97', function (rqs, res) {
  var mem_customer_id = 0;
  // console.log(rqs.session.memberprofile.id);
  if (rqs.session.memberprofile == null) {
    mem_customer_id = 0;
  } else {
    mem_customer_id = rqs.session.memberprofile.id;
  }
  db.exec(
    'SELECT * FROM products WHERE product_gender = "Male" AND product_category = "下著" ORDER BY product_upload DESC;SELECT F.customer_id, F.product_id, P.product_name, P.product_image, P.product_description, P.product_price FROM favorite AS F INNER JOIN products AS P ON F.product_id = P.product_id WHERE F.customer_id = ?;',
    [mem_customer_id],
    (results, fields) => {
      var arr = [];
      for (var i = 0; i < results[1].length; i++) {
        arr[i] = results[1][i].product_id;
      }
      console.log(arr + " get");
      res.render('shop', {
        result: results[0],
        favorArr: arr
      });
    }
  );
});

router.get('/Male/pants/single_product/:id', getUrl, function (rqs, res) {
  db.exec(
    'SELECT * from products WHERE product_id = ?',
    [rqs.params.id],
    (rows, fields) => {
      db.exec('SELECT * FROM products ORDER BY product_update DESC;',
        [], (pro, sss) => {
          res.render('single_product', { result: rows, pro: pro });

        })

    }
  );
});

// 1.3 Male Product bags
router.get('/Male/%E5%8C%85', getUrl, function (rqs, res) {
  var mem_customer_id = 0;
  // console.log(rqs.session.memberprofile.id);
  if (rqs.session.memberprofile == null) {
    mem_customer_id = 0;
  } else {
    mem_customer_id = rqs.session.memberprofile.id;
  }
  db.exec(
    'SELECT * FROM products WHERE product_gender = "Male" AND product_category = "包" ORDER BY product_upload DESC;SELECT F.customer_id, F.product_id, P.product_name, P.product_image, P.product_description, P.product_price FROM favorite AS F INNER JOIN products AS P ON F.product_id = P.product_id WHERE F.customer_id = ?;',
    [mem_customer_id],
    (results, fields) => {
      var arr = [];
      for (var i = 0; i < results[1].length; i++) {
        arr[i] = results[1][i].product_id;
      }
      console.log(arr + " get");
      res.render('shop', {
        result: results[0],
        favorArr: arr
      });
    }
  );
});

router.get('/Male/bags/single_product/:id', getUrl, function (rqs, res) {
  db.exec(
    'SELECT * from products WHERE product_id = ?',
    [rqs.params.id],
    (rows, fields) => {
      db.exec('SELECT * FROM products ORDER BY product_update DESC;',
        [], (pro, sss) => {
          res.render('single_product', { result: rows, pro: pro });

        })

    }
  );
});

// 1.4 Male Product shoes
router.get('/Male/%E9%9E%8B', getUrl, function (rqs, res) {
  var mem_customer_id = 0;
  // console.log(rqs.session.memberprofile.id);
  if (rqs.session.memberprofile == null) {
    mem_customer_id = 0;
  } else {
    mem_customer_id = rqs.session.memberprofile.id;
  }
  db.exec(
    'SELECT * FROM products WHERE product_gender = "Male" AND product_category = "鞋" ORDER BY product_upload DESC;SELECT F.customer_id, F.product_id, P.product_name, P.product_image, P.product_description, P.product_price FROM favorite AS F INNER JOIN products AS P ON F.product_id = P.product_id WHERE F.customer_id = ?;',
    [mem_customer_id],
    (results, fields) => {
      var arr = [];
      for (var i = 0; i < results[1].length; i++) {
        arr[i] = results[1][i].product_id;
      }
      console.log(arr + " get");
      res.render('shop', {
        result: results[0],
        favorArr: arr
      });
    }
  );
});

router.get('/Male/shoes/single_product/:id', getUrl, function (rqs, res) {
  db.exec(
    'SELECT * from products WHERE product_id = ?',
    [rqs.params.id],
    (rows, fields) => {
      db.exec('SELECT * FROM products ORDER BY product_update DESC;',
        [], (pro, sss) => {
          res.render('single_product', { result: rows, pro: pro });

        })

    }
  );
});

// 2.1 Female Product shirts
router.get('/Female/%E4%B8%8A%E8%A1%A3', getUrl, function (rqs, res) {
  var mem_customer_id = 0;
  // console.log(rqs.session.memberprofile.id);
  if (rqs.session.memberprofile == null) {
    mem_customer_id = 0;
  } else {
    mem_customer_id = rqs.session.memberprofile.id;
  }
  db.exec(
    'SELECT * FROM products WHERE product_gender = "Female" AND product_category = "上衣" ORDER BY product_upload DESC;SELECT F.customer_id, F.product_id, P.product_name, P.product_image, P.product_description, P.product_price FROM favorite AS F INNER JOIN products AS P ON F.product_id = P.product_id WHERE F.customer_id = ?;',
    [mem_customer_id],
    (results, fields) => {
      var arr = [];
      for (var i = 0; i < results[1].length; i++) {
        arr[i] = results[1][i].product_id;
      }
      console.log(arr + " get");
      res.render('shop', {
        result: results[0],
        favorArr: arr
      });
    }
  );
});

router.get('/Female/single_product/:id', getUrl, function (rqs, res) {
  db.exec(
    'SELECT * from products WHERE product_id = ?',
    [rqs.params.id],
    (rows, fields) => {
      db.exec('SELECT * FROM products ORDER BY product_update DESC;',
        [], (pro, sss) => {
          res.render('single_product', { result: rows, pro: pro });

        })

    }
  );
});

// 2.2 Female Product dresses
router.get('/Female/%E6%B4%8B%E8%A3%9D', getUrl, function (rqs, res) {
  var mem_customer_id = 0;
  // console.log(rqs.session.memberprofile.id);
  if (rqs.session.memberprofile == null) {
    mem_customer_id = 0;
  } else {
    mem_customer_id = rqs.session.memberprofile.id;
  }
  db.exec(
    'SELECT * FROM products WHERE product_gender = "Female" AND product_category = "洋裝" ORDER BY product_upload DESC;SELECT F.customer_id, F.product_id, P.product_name, P.product_image, P.product_description, P.product_price FROM favorite AS F INNER JOIN products AS P ON F.product_id = P.product_id WHERE F.customer_id = ?;',
    [mem_customer_id],
    (results, fields) => {
      var arr = [];
      for (var i = 0; i < results[1].length; i++) {
        arr[i] = results[1][i].product_id;
      }
      console.log(arr + " get");
      res.render('shop', {
        result: results[0],
        favorArr: arr
      });
    }
  );
});

router.get('/Female/single_product/:id', getUrl, function (rqs, res) {
  db.exec(
    'SELECT * from products WHERE product_id = ?',
    [rqs.params.id],
    (rows, fields) => {
      db.exec('SELECT * FROM products ORDER BY product_update DESC;',
        [], (pro, sss) => {
          res.render('single_product', { result: rows, pro: pro });

        })

    }
  );
});

// 2.3 Female Product skirts
router.get('/Female/%E8%A3%99%E5%AD%90', getUrl, function (rqs, res) {
  var mem_customer_id = 0;
  // console.log(rqs.session.memberprofile.id);
  if (rqs.session.memberprofile == null) {
    mem_customer_id = 0;
  } else {
    mem_customer_id = rqs.session.memberprofile.id;
  }
  db.exec(
    'SELECT * FROM products WHERE product_gender = "Female" AND product_category = "裙子" ORDER BY product_upload DESC;SELECT F.customer_id, F.product_id, P.product_name, P.product_image, P.product_description, P.product_price FROM favorite AS F INNER JOIN products AS P ON F.product_id = P.product_id WHERE F.customer_id = ?;',
    [mem_customer_id],
    (results, fields) => {
      var arr = [];
      for (var i = 0; i < results[1].length; i++) {
        arr[i] = results[1][i].product_id;
      }
      console.log(arr + " get");
      res.render('shop', {
        result: results[0],
        favorArr: arr
      });
    }
  );
});

router.get('/Female/single_product/:id', getUrl, function (rqs, res) {
  db.exec(
    'SELECT * from products WHERE product_id = ?',
    [rqs.params.id],
    (rows, fields) => {
      db.exec('SELECT * FROM products ORDER BY product_update DESC;',
        [], (pro, sss) => {
          res.render('single_product', { result: rows, pro: pro });

        })

    }
  );
});

// 2.4 Female Product shoes
router.get('/Female/%E9%9E%8B', getUrl, function (rqs, res) {
  var mem_customer_id = 0;
  // console.log(rqs.session.memberprofile.id);
  if (rqs.session.memberprofile == null) {
    mem_customer_id = 0;
  } else {
    mem_customer_id = rqs.session.memberprofile.id;
  }
  db.exec(
    'SELECT * FROM products WHERE product_gender = "Female" AND product_category = "鞋" ORDER BY product_upload DESC;SELECT F.customer_id, F.product_id, P.product_name, P.product_image, P.product_description, P.product_price FROM favorite AS F INNER JOIN products AS P ON F.product_id = P.product_id WHERE F.customer_id = ?;',
    [mem_customer_id],
    (results, fields) => {
      var arr = [];
      for (var i = 0; i < results[1].length; i++) {
        arr[i] = results[1][i].product_id;
      }
      console.log(arr + " get");
      res.render('shop', {
        result: results[0],
        favorArr: arr
      });
    }
  );
});

router.get('/Female/single_product/:id', getUrl, function (rqs, res) {
  db.exec(
    'SELECT * from products WHERE product_id = ?',
    [rqs.params.id],
    (rows, fields) => {
      db.exec('SELECT * FROM products ORDER BY product_update DESC;',
        [], (pro, sss) => {
          res.render('single_product', { result: rows, pro: pro });

        })

    }
  );
});

// 2.5 Female Product hats
router.get('/Female/%E5%B8%BD%E5%AD%90', getUrl, function (rqs, res) {
  var mem_customer_id = 0;
  // console.log(rqs.session.memberprofile.id);
  if (rqs.session.memberprofile == null) {
    mem_customer_id = 0;
  } else {
    mem_customer_id = rqs.session.memberprofile.id;
  }
  db.exec(
    'SELECT * FROM products WHERE product_gender = "Female" AND product_category = "帽子" ORDER BY product_upload DESC;SELECT F.customer_id, F.product_id, P.product_name, P.product_image, P.product_description, P.product_price FROM favorite AS F INNER JOIN products AS P ON F.product_id = P.product_id WHERE F.customer_id = ?;',
    [mem_customer_id],
    (results, fields) => {
      var arr = [];
      for (var i = 0; i < results[1].length; i++) {
        arr[i] = results[1][i].product_id;
      }
      console.log(arr + " get");
      res.render('shop', {
        result: results[0],
        favorArr: arr
      });
    }
  );
});

router.get('/Female/single_product/:id', getUrl, function (rqs, res) {
  db.exec(
    'SELECT * from products WHERE product_id = ?',
    [rqs.params.id],
    (rows, fields) => {
      // db.exec('SELECT * FROM products ORDER BY product_update DESC;',
      // [],(pro,sss)=>{
      //   res.render('single_product', { result: rows ,pro:pro});

      // });
      res.render('single_product', { result: rows, pro: ["pro"] });


    }
  );
});

module.exports = router;
