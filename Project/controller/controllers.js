// 先從 model 引入 todos 資料
const todoModel = require('../models/home/models')


const todoController = {
  getAll: (req, res) => {
    // 改成 callback 非同步操作
    todoModel.getAll((err, results) => {
      // 如果有 err 就印出錯誤訊息
      if (err) return console.log(err);
      console.log("aaa");
      // 不然就把 todos 傳給 view



      var arr = [];
      for (var i = 0; i < results.length; i++) {
        arr[i] = results[i].product_id;
      }
      console.log(arr);
      res.render('shop', {
        todos: results,
        favorArr: arr
      })

    })

  },

  // get: (req, res) => {
  //   const id = req.params.id
  //   todoModel.get(id, (err, results) => {
  //     if (err) return console.log(err);
  //     res.render('todo', {
  //       // 注意回傳的結果 array，必須取 results[0] 才會是一個 todo
  //       todos: results
  //     })
  //   })
  // },

  addTodo: (req, res) => {
    todoModel.getAll((err, results) => {
      // 如果有 err 就印出錯誤訊息
      if (err) return console.log(err);
      console.log("bbb");

      var arr = [];
      for (var i = 0; i < results.length; i++) {
        arr[i] = results[i].product_id;
      }
      // console.log(arr);
      res.render('shop', {
        favorArr: arr
      })

    })
    // res.render('addTodo')
  },

  newTodo: (req, res) => {
    console.log("MMO");
    todoModel.getAll((err, results) => {
      // 如果有 err 就印出錯誤訊息
      if (err) return console.log(err);
      console.log("ccc");

      // console.log("MMO");

      console.log(!!(req.body.memcontent));
      const memcontent = parseInt(req.body.memcontent);
      if (!!(req.body.memcontent)) {

        console.log(memcontent);
        todoModel.deleteAll(memcontent, (err) => {
          // if (err) return console.log(err);
          // 重新頁面
          res.redirect('shop');
        })
      }

      var arr = [];
      for (var i = 0; i < results.length; i++) {
        arr[i] = results[i].product_id;
      }
      res.render('shop', {
              todos: results,
              favorArr: arr
            })
      // console.log(arr);

      const content = parseInt(req.body.content);

      // console.log(arr);
      if (!!(req.body.content)) {
        if (arr.includes(content)) {
          console.log("true")
          todoModel.delete(content, (err) => {
            // if (err) return console.log(err);
            // 重新頁面
            res.redirect('/female');
          })
        } else {
          console.log("555")
          todoModel.add(content, (err) => {
            // if (err) return console.log(err);
            // 重新頁面
            res.redirect('/female');
          })
        }
      }


    })
  },
}

module.exports = todoController