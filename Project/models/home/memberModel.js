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
    },
    memberPwChange: (user, cb) => {
        db.exec('update customer_id set cPassword = ? where cAccount = ? ',
            [user.newpw, user.s_cAccount],
            (result, fields, err) => {
                console.log('pass database')
                if (err) return cb(err);
                cb(null);
            })
    },
    handlelogin: (cAccount, cb) => {
        db.exec('select * from customer_id where cAccount = ?',
            [cAccount],
            (result, fields, err) => {
                cb(null, result[0]);
            })
    },
    getOrder:(member,cb)=>{
        db.exec('select O.order_list, O.order_update, OI.product_id, OI.UnitPrice,OI.Quantity from orders AS O left join order_items AS OI on O.order_list = OI.order_list where O.user_email = ? order by O.order_update DESC',
        [member],
        (result,fields,err)=>{
            // var xx =JSON.stringify(result[0].order_update);
            // console.log(xx);
            // console.log('here is orderList result---------')
            // console.log(result);
            console.log(result.length);
            cb(null,result);
            
        })
    }

}

module.exports = memberModel;
