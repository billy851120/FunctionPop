// 引入 db，也就是 connection
const db = require('../../dataBase')

const todoModel = {
  // 這裡要用 callback 來拿取資料
  getAll: (cb) => {
    console.log("FFFF")
    db.exec(
      'SELECT F.customer_id, F.product_id, P.product_name, P.product_image, P.product_description, P.product_price FROM favorite AS F INNER JOIN products AS P ON F.product_id = P.product_id WHERE F.customer_id = 1', (err, results) => {
        if (err) return cb(err);
        // cb: 第一個參數為是否有錯誤，沒有的話就是 null，第二個才是結果
        cb(null, results)
      });
  },

  get: (id, cb) => {
    db.exec(
      'SELECT * FROM favorite where customer_id = ?', [id], (results, err) => {
        if (err) return cb(err);
        cb(null, results)
      });
  },

  // 新增 todoModel.add()
  add: (content, cb) => {
    db.exec(
      'INSERT INTO favorite VALUES(1,?)', [content], (results, err) => {
        if (err) return cb(err);
        cb(null)
      }
    );
  },

  delete: (content, cb) => {
    db.exec(
      'DELETE FROM favorite WHERE product_id = ?', [content], (results, err) => {
        if (err) return cb(err);
        cb(null)
      }
    );
  },

  deleteAll: (memcontent, cb) => {
    db.exec(
      'DELETE FROM favorite WHERE customer_id = ?', [memcontent], (results, err) => {
        if (err) return cb(err);
        cb(null)
      }
    );
  }
}

module.exports = todoModel