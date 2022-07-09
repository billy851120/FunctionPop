const { json } = require('body-parser');
const { data } = require('jquery');
var express = require('express');
var bodyParser = require('body-parser');
var db = require('../../dataBase');
var router = express.Router();
var events = require(`events`);
var emitter = new events.EventEmitter();
var moment = require('moment');
var shortDataFormat = 'YYYY-MM-DD';
router.use(bodyParser.json());
router.use((req, res, next) => {
  res.locals.moment = moment;
  res.locals.shortDataFormat = shortDataFormat;
  next();
});
//--------------------------------------


//------------所有商品指令---------------


router.get('/item_all', function (rqs, res) {
  res.render('admin_item_all');
  res.redirect('/admin/goods/item_all/1');//把<=0的id強制改成1
});

router.get('/item_all/:page([0-9]+)', function (rqs, res) {
  var page = rqs.params.page
  if (page <= 0) {
    res.redirect('/item_all')
    return
  }//每頁資料數
  var nums_per_page = 10       //定義資料偏移量
  var offset = (page - 1) * nums_per_page
  db.exec(`SELECT * FROM products LIMIT ${offset}, ${nums_per_page};`, [], function (data, fields) {
    db.exec(`SELECT COUNT(*) AS COUNT FROM products`, [], function (nums, fields) {
      var last_page = Math.ceil(nums[0].COUNT / nums_per_page)
      //避免請求超過最大頁數
      if (page > last_page) {
        res.redirect('/admin/goods/member/' + last_page)
        return
      }
      res.render('admin_item_all', {
        data: data,
        curr_page: page,
        //本頁資料數量
        total_nums: nums[0].COUNT,
        //總數除以每頁筆數，再無條件取整數
        last_page: last_page
      })
    })
  })
})


//------------所有商品指令---------------

//------------訂單編號指令---------------

router.get('/orderMgat_num', function (rqs, res) {
  res.render('admin_orderMgat_num');
  res.redirect('/admin/goods/orderMgat_num/1');//把<=0的id強制改成1
});

router.get('/orderMgat_num/:page([0-9]+)', function (rqs, res) {
  var page = rqs.params.page
  if (page <= 0) {
    res.redirect('/orderMgat_num/1')
    return
  }//每頁資料數
  var nums_per_page = 10       //定義資料偏移量
  var offset = (page - 1) * nums_per_page
  var sql = `
  SELECT * FROM orders ORDER BY orders.order_list DESC LIMIT ${offset}, ${nums_per_page};
  SELECT COUNT(*) AS COUNT FROM orders;
  SELECT * FROM orders WHERE to_days(order_update) = to_days(now());
  SELECT COUNT(*) AS COUNT FROM orders WHERE DATE_SUB(CURDATE(), INTERVAL 7 DAY) <= date(order_update);
  SELECT SUM(UnitPrice) AS COUNT FROM order_items WHERE to_days(order_date) = to_days(now());
  SELECT COUNT(*) AS COUNT FROM orders WHERE to_days(order_update) = to_days(now());
  SELECT SUM(UnitPrice) AS COUNT FROM order_items;`;


  db.exec(sql, [], function (results, fields) {
    var last_page = Math.ceil(results[1][0].COUNT / nums_per_page)   //避免請求超過最大頁數
    if (page > last_page) {
      res.redirect('/admin/goods/orderMgat_num/' + last_page)
      return
    }
    res.render('admin_orderMgat_num', {

      data: results[0],
      total_nums: results[1][0].COUNT,    //總數除以每頁筆數，再無條件取整數
      orderToday: results[2],
      orderWeek: results[3][0].COUNT,
      curr_page: page,   //本頁資料數量
      last_page: last_page,
      sale_today: results[4][0].COUNT,
      orderToday_count: results[5][0].COUNT,
      allSumcount: results[6][0].COUNT

    })

  })
})
router.get('/orderMgat_num/detail/:id([0-9]+)', function (rqs, res) {
  var sql = `
  SELECT * FROM orders
  LEFT JOIN order_items
  ON orders.order_list = order_items.order_list AND orders.order_list = order_items.order_list
  LEFT JOIN products_all
  ON order_items.product_id = products_all.product_all_id WHERE orders.order_list = ?;`
  var data = [rqs.params.id]
  db.exec(sql, data, function (results, fields) {
    console.log(sql)
    if (results[0]) {
      res.end(
        JSON.stringify(new Success(results))
      )
    } else {
      res.end(
        JSON.stringify(new Error('no result'))
      )
    }
  })
})

//------------訂單編號指令---------------

//------------首頁指令---------------

router.get('/', function (rqs, res) {
  var sql = `
  SELECT COUNT(*) AS COUNT FROM products_all ;
  SELECT COUNT(*) AS COUNT FROM orders WHERE to_days(order_update) = to_days(now());
  SELECT SUM(UnitPrice) AS COUNT FROM order_items WHERE to_days(order_date) = to_days(now());
  SELECT SUM(UnitPrice) AS COUNT FROM order_items WHERE order_date>=date_sub(curdate(),interval 7 day);`;

  db.exec(sql, [], function (results, fields) {
    res.render('admin_index', {
      total: results[0][0].COUNT,
      order_today: results[1][0].COUNT,
      sale_today: results[2][0].COUNT,
      sale_7today: results[3][0].COUNT,
    });
  })
})

//------------首頁指令---------------


//------------製作會員分頁---------------

router.get('/member', function (rqs, res) {
  res.render('admin_member');
  res.redirect('/admin/goods/member/1');
});
router.get('/member/:page([0-9]+)', function (rqs, res) {
  var page = rqs.params.page //把<=0的id強制改成1
  if (page <= 0) {
    res.redirect('/member/1')
    return
  }//每頁資料數
  var nums_per_page = 10       //定義資料偏移量
  var offset = (page - 1) * nums_per_page
  db.exec(`SELECT * FROM customer_id ORDER BY customer_id.id DESC LIMIT ${offset}, ${nums_per_page};`, [], function (data, fields) {
    db.exec(`SELECT COUNT(*) AS COUNT FROM customer_id`, [], function (nums, fields) {
      var last_page = Math.ceil(nums[0].COUNT / nums_per_page)
      //避免請求超過最大頁數
      if (page > last_page) {
        res.redirect('/admin/goods/member/' + last_page)
        return
      }
      res.render('admin_member', {
        data: data,
        curr_page: page,
        //本頁資料數量
        total_nums: nums[0].COUNT,
        //總數除以每頁筆數，再無條件取整數
        last_page: last_page
      })
    })
  })
})

router.get('/member/detail/:id([0-9]+)', function (rqs, res) {
  var sql = `SELECT * FROM customer_id WHERE id = ?;`
  var data = [rqs.params.id]
  db.exec(sql, data, function (results, fields) {
    if (results[0]) {
      res.end(
        JSON.stringify(new Success(results[0]))
      )
    } else {
      res.end(
        JSON.stringify(new Error('no result'))
      )
    }
  })
})


router.get('/member/add', function (rqs, res) {
  res.render('add')
})

router.post('/member/delete', function (rqs, res) {
  var body = rqs.body
  var sql = `DELETE FROM customer_id WHERE id = ?;`
  var data = [parseInt(body.id)]
  db.exec(sql, data, function (results, fields) {
    //使用affectedRows，判斷是否有被刪除
    if (results.affectedRows) {
      res.end(
        JSON.stringify(new Success('delete success'))
      )
    } else {
      res.end(
        JSON.stringify(new Error('delete failed'))
      )
    }
  })
})
function DELETE(id) {
  const sql = `DELETE FROM customer_id WHERE id = ?;`;
  const data = [id];
  db.exec(sql, data, function (results, fields) {
    if (results.affectedRows) {
      console.log(JSON.stringify(new Success('delete success')));
    } else {
      console.log(JSON.stringify(new Error('delete failed')));
    }
  });
}
router.post('/member/update', function (rqs, res) {
  var body = rqs.body
  var sql = `UPDATE customer_id SET cName = ?, cAccount = ?, cPhone = ? ,cAddr = ? WHERE id = ?;`;
  var data = [body.cName, body.cAccount, body.cPhone, body.cAddr, body.id]
  db.exec(sql, data, function (results, fields) {

    if (results.affectedRows) {
      res.end(
        JSON.stringify(new Success('update success'))
      )
    } else {
      res.end(
        JSON.stringify(new Error('update failed'))
      )
    }
  })
})

function UPDATE(cName, cgender, cAccount, cAddr, id) {
  const sql = `UPDATE customer_id SET cName = ?, cgender = ?, cAccount = ?, cPhone = ? ,cAddr = ? WHERE id = ?;`;
  const data = [cName, cgender, cAccount, cPhone, cAddr, parseInt(body.id)];
  db.exec(sql, data, function (results, fields) {
    console.log(results)
    if (results.affectedRows) {
      console.log(JSON.stringify(new Success('update success')));
    } else {
      console.log(JSON.stringify(new Error('update failed')));
    }
  });
}



//------------製作會員分頁---------------



//------後端MYSQL下指令地方-----------------


router.get('/', function (rqs, res) {
  db.exec('SELECT * FROM customer_id', [], (result, fields) => {
    res.render('admin_index', { data: result });
  });
});
router.get('/member', function (rqs, res) {
  db.exec('SELECT * FROM customer_id', [], (result, fields) => {
    res.render('admin_member', { data: result });
  });
});
router.post('/member', function (rqs, res) {
  db.exec('SELECT COUNT(*) FROM customer_id', [], (result, fields) => {
    res.render('admin_member', { data: result });
  });
});


router.get('/member', function (rqs, res) {
  db.exec('SELECT * FROM customer_id', [], (result, fields) => {
    res.render('admin_member', { data: result });
  });
});


//--------------新增菜單--------------------


router.get('/item_shelf', function (rqs, res) {
  res.render('admin_item_shelf', { title: '後台管理系統' });
});

router.get('/item_shelf', function (rqs, res) {
  res.render('admin_item_shelf', {})
})
router.post("/item_shelf", function (rqs, res) {
  var body = rqs.body; //    監聽資料庫寫入返回的引數
  emitter.on("ok", function () {
    return res.end("新增成功");    //    向前臺返回資料
  });
  emitter.on("false", function () {
    return res.end("新增失敗");    //    向前臺返回資料
  });

  var sql = "insert into products(product_name,product_gender,product_description,product_price) values(?,?,?,?)"; //向user這個表裡寫入資料
  var data = [body.product_name, body.product_gender, body.product_description, body.product_price];
  db.exec(sql, data, function (results, fields, err) {    //    執行sql語句
    if (err) {
      console.log(err.message);    //    輸出資料庫錯誤資訊
      emitter.emit("false");    //    返回失敗
    }
    emitter.emit("ok");    //    返回成功
  });

})

//--------------新增菜單--------------------




//--------------管理員登入------------------

router.get('/login', function (rqs, res) {
  res.render('admin_login', { title: '後台管理系統' });
});

router.post("/login", function (rqs, res) {
  var body = rqs.body;
  emitter.on("false", function () {
    return res.end("資料庫判斷有誤");    //    向前臺返回資料
  });
  emitter.on("false2", function () {
    return res.end("輸入帳密錯誤");    //    向前臺返回資料
  });
  emitter.on("success", function () {
    return res.end("ok");    //    向前臺返回資料
  });

  var sql = "select * from admin_user where aAccount ='" + body.aAccount + "' and aPassword='" + body.aPassword + "';";    //    在資料庫裡面查詢使用者名稱跟密碼
  db.exec(sql, [], function (results, fields, err) {  //    執行sql語句，並返回結果

    if (err) {
      console.log("資料庫錯誤");
      emitter.emit("false");
      return
    }
    if (results.length == 0) {
      console.log("資料庫裡面沒找到配對的內容返回引數");
      emitter.emit("false2");

    } else {
      console.log("success");
      emitter.emit("success");

    }
  });

})

//--------------管理員登入------------------



//--------------------------讀檔案--------------------------------



router.get('/', function (rqs, res) {
  res.render('admin_index', { title: '後台管理系統' });
});
router.get('/item_del', function (rqs, res) {
  res.render('admin_item_del', { title: '後台管理系統' });
});



router.get('/stockMgat_all', function (rqs, res) {
  res.render('admin_stockMgat_all', { title: '後台管理系統' });
});
//--------------------------讀檔案--------------------------------


class Success {
  constructor(data, message) {
    if (typeof data === 'string') {
      this.message = data
      data = null
      message = null
    }
    if (data) {
      this.data = data
    }
    if (message) {
      this.message = message
    }
    this.errno = 1
  }
}

class Error {
  constructor(data, message) {
    if (typeof data === 'string') {
      this.message = data
      data = null
      message = null
    }
    if (data) {
      this.data = data
    }
    if (message) {
      this.message = message
    }
    this.errno = 0
  }
}

module.exports = {
  Success,
  Error
}


module.exports = router;
