var db = require('../../dataBase');

var memberModel = {
    personalData: (cb) => {

    },

    getMemberData: (cAccount, cb) => {
        db.exec('select * from customer_id where cAccount = ?', [cAccount], (result, err, zzz) => {
            console.log('result.........');
            console.log(result);
            console.log(`cName : ${result[0].cName}`);
            console.log(`cPassword : ${result[0].cPassword}`);
            if (err) return cb(err);
            cb(result[0]);
        });
    }

}

module.exports = memberModel;
