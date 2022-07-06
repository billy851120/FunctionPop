var db = require('../../dataBase');

var memberModel = {
    personalData: (cb) => {

    },

    updateMemberData: (user, cb) => {
        db.exec('update customer_id set cPhone = ? , cAddr = ? where cAccount = ? ',
            [user.cPhone, user.cAddr, user.s_cAccount],
            (result, fields, err) => {

                if (err) return cb(err);
                cb(null)
            })
    },

    add_member: (user, cb) => {
        db.exec("insert into customer_id(cName,cBirth,cgender,cAccount,cPhone,cAddr,cPassword) values(?,?,?,?,?,?,?)",
            [user.cName, user.cBirth, user.cgender, user.cAccount, user.cPhone, user.cAddr, user.cPassword],
            (result, fields, err) => {
                console.log('insert DONE');
                if (err) return cb(err);
                cb(null);
            });
    }

}

module.exports = memberModel;
