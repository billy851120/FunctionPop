const { json } = require('body-parser');
var express = require('express');
var bodyParser = require('body-parser');
var db = require('../../dataBase');
var router = express.Router();
var events = require(`events`);
var emitter = new events.EventEmitter();
router.use(bodyParser.json());

//------------製作會員分頁---------------

router.get('/member', function (rqs, res) {
  res.render('admin_member');
  res.redirect('/admin/goods/member/1');
});
router.get('/member/:page([0-9]+)', function (rqs, res) {

  var page = rqs.params.page
  //把<=0的id強制改成1
  if (page <= 0) {
    res.redirect('/member')
    return
  }
  //每頁資料數
  var nums_per_page = 10 //定義資料偏移量
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

router.post('/member/insert', function (rqs, res) {
  var body = rqs.body
  var sql = `INSERT INTO customer_id(cName,cBirth,cgender,cAccount,cPhone,cAddr) VALUES(?,?,?,?,?,?);`
  var data = [body.cName, body.cBirth, body.cgender, body.cAccount, body.cPhone, body.cAddr]
  db.exec(sql, data, function (results, fields) {
    if (results.insertId) {
      res.end(
        JSON.stringify(new Success('insert success'))
      )
    } else {
      res.end(
        JSON.stringify(new Error('insert failed'))
      )
    }
  })
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
  var data = [body.cName, body.cAccount, body.cPhone, body.cAddr,body.id]
  db.exec(sql, data, function (results, fields) {
    console.log("sql")
    console.log(sql)
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

function UPDATE(cName,  cgender, cAccount, cAddr,id) {
  const sql = `UPDATE customer_id SET cName = ?, cgender = ?, cAccount = ?, cPhone = ? ,cAddr = ? WHERE id = ?;`;
  const data = [cName,  cgender, cAccount, cPhone, cAddr, parseInt(body.id)];
  db.exec(sql, data, function (results, fields) {
    console.log("UPDATE-2")
    console.log(results)
    if (results.affectedRows) {
      console.log(JSON.stringify(new Success('update success')));
    } else {
      console.log(JSON.stringify(new Error('update failed')));
    }
  });
}



//------------製作會員分頁---------------


//------------製作分頁---------------

router.get('/stockMgat_all', function (rqs, res) {
  res.render('admin_stockMgat_all');
  res.redirect('/admin/goods/stockMgat_all/1');
});
router.get('/stockMgat_all/:page([0-9]+)', function (rqs, res) {

  var page = rqs.params.page
  //把<=0的id強制改成1
  if (page <= 0) {
    res.redirect('/stockMgat_all')
    return
  }
  //每頁資料數
  var nums_per_page = 10
  //定義資料偏移量
  var offset = (page - 1) * nums_per_page

  db.exec(`SELECT * FROM inventory LIMIT ${offset}, ${nums_per_page};`, [], function (data, fields) {
    db.exec(`SELECT COUNT(*) AS COUNT FROM inventory`, [], function (nums, fields) {
      var last_page = Math.ceil(nums[0].COUNT / nums_per_page)

      //避免請求超過最大頁數
      if (page > last_page) {
        res.redirect('/admin/goods/stockMgat_all/' + last_page)
        return
      }

      res.render('admin_stockMgat_all', {
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
router.get('/stockMgat_all/detail/:id([0-9]+)', function (rqs, res) {
  var sql = `SELECT * FROM inventory WHERE id = ?;`
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

router.get('/stockMgat_all/add', function (rqs, res) {
  res.render('add')
})

router.post('/stockMgat_all/insert', function (rqs, res) {
  var body = rqs.body
  var sql = `INSERT INTO inventory(name, phone, address, adult_mask, child_mask) VALUES(?,?,?,?,?);`
  var data = [body.name, body.phone, body.address, parseInt(body.adult_mask), parseInt(body.child_mask)]
  db.exec(sql, data, function (results, fields) {
    if (results.insertId) {
      res.end(
        JSON.stringify(new Success('insert success'))
      )
    } else {
      res.end(
        JSON.stringify(new Error('insert failed'))
      )
    }
  })
})

router.post('/stockMgat_all/update', function (rqs, res) {
  var body = rqs.body
  var sql = `UPDATE inventory SET name = ?, phone = ?, address = ?, adult_mask = ?, child_mask = ? WHERE id = ?`;
  var data = [body.name, body.phone, body.address, parseInt(body.adult_mask), parseInt(body.child_mask), parseInt(body.id)]
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

router.post('/stockMgat_all/delete', function (rqs, res) {
  var body = rqs.body
  var sql = `DELETE FROM inventory WHERE id = ?;`
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
function UPDATE(name, phone, address, adult_mask, child_mask, id) {
  const sql = `UPDATE inventory SET name = ?, phone = ?, address = ?, adult_mask = ?, child_mask = ? WHERE id = ?`;
  const data = [name, phone, address, adult_mask, child_mask, id];
  db.exec(sql, data, function (results, fields) {
    if (results.affectedRows) {
      console.log(JSON.stringify(new Success('update success')));
    } else {
      console.log(JSON.stringify(new Error('update failed')));
    }
  });
}

// UPDATE('更改後的診所', '(02)2222-2222', '台北市', 100, 1000, 36);

function DELETE(id) {
  const sql = `DELETE FROM inventory WHERE id = ?;`;
  const data = [id];
  db.exec(sql, data, function (results, fields) {
    if (results.affectedRows) {
      console.log(JSON.stringify(new Success('delete success')));
    } else {
      console.log(JSON.stringify(new Error('delete failed')));
    }
  });
}

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

router.get('/item_all', function (rqs, res) {
  db.exec('SELECT * FROM products', [], (result, fields) => {
    res.render('admin_item_all', { data: result });
  });
});



router.get('/member', function (rqs, res) {
  db.exec('SELECT * FROM customer_id', [], (result, fields) => {
    res.render('admin_member', { data: result });
  });
});


//--------------刪除--------------------



router.get('/item_del', function (rqs, res) {
  res.render('admin_item_del', { title: '安安' });
});

router.post('/item_del', function (rqs, res) {

  var action = rqs.body.action;

  if (action == 'fetch') {
    var query = "SELECT * FROM customer_id ORDER BY id DESC";

    db.exec(query, function (error, data) {

      res.json({ data: data });
    })
  }
  if (action == 'Add') {
    var cName = rqs.body.cName;

    var cBirth = rqs.body.cBirth;

    var cAccount = rqs.body.cAccount;


    var query = `
		INSERT INTO customer_id 
		(cName, cBirth, cAccount) 
		VALUES ("${cName}", "${cBirth}", "${cAccount}"
		`;

    db.exec(query, function (error, data) {
      console.log("ddddddddddd")
      res.json({
        message: 'Data Added'
      });
    });
  }


})


//--------------刪除--------------------
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


router.get('/item_all', function (rqs, res) {
  res.render('admin_item_all', { title: '後台管理系統' });
});
router.get('/', function (rqs, res) {
  res.render('admin_index', { title: '後台管理系統' });
});
router.get('/item_del', function (rqs, res) {
  res.render('admin_item_del', { title: '後台管理系統' });
});


router.get('/orderMgat_num', function (rqs, res) {
  res.render('admin_orderMgat_num', { title: '後台管理系統' });
});

router.get('/stockMgat_all', function (rqs, res) {
  res.render('admin_stockMgat_all', { title: '後台管理系統' });
});
//--------------------------讀檔案--------------------------------





module.exports = router;
