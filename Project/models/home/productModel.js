var db = require('../../dataBase');

var productModel = {

    getAll: (cb) => {
        db.exec('SELECT * FROM products', [], (result, fields) => {
            console.log(result);
            if (err) return cb(err);
            cb(null, result);
        });
    }



}


module.exports = productModel;