var db = require('../../dataBase');

var memberModel = {
    // ---------------更新會員資料---------------
    updateMemberData: (user, cb) => {
        db.exec('update customer_id set cPhone = ? , cAddr = ? where cAccount = ? ',
            [user.cPhone, user.cAddr, user.s_cAccount],
            (result, fields, err) => {
                if (err) return cb(err);
                cb(null)
            })
    },
    // ---------------註冊使用者---------------
    add_member: (user, cb) => {
        db.exec("insert into customer_id(cName,cBirth,cgender,cAccount,cPhone,cAddr,cPassword) values(?,?,?,?,?,?,?)",
            [user.cName, user.cBirth, user.cgender, user.cAccount, user.cPhone, user.cAddr, user.cPassword],
            (result, fields, err) => {
                console.log('insert DONE');
                if (err) return cb(err);
                cb(null);
            });
    },
    // ---------------變更密碼---------------
    memberPwCheck: (s_cAccount, cb) => {
        db.exec('select * from customer_id where cAccount = ?',
            [s_cAccount],
            (result, fields, err) => {
                cb(null, result[0]);
            })
    },
    updateMemberPw: (user, cb) => {
        db.exec('update customer_id set cPassword = ? where cAccount = ? ',
            [user.newpw, user.s_cAccount],
            (result, fields, err) => {
                console.log('pass database')
                if (err) return cb(err);
                cb(null);
            })
    },
    // ---------------登入處理---------------
    handlelogin: (cAccount, cb) => {
        db.exec('select * from customer_id where cAccount = ?',
            [cAccount],
            (result, fields, err) => {
                cb(null, result[0]);
            })
    },
    // ---------------獲取訂單---------------
    getOrder: (member, cb) => {
        db.exec('select O.order_list, O.order_update, OI.product_id, OI.UnitPrice,OI.Quantity from orders AS O left join order_items AS OI on O.order_list = OI.order_list where O.user_email = ? order by O.order_update DESC',
            [member],
            (result, fields, err) => {
                // var xx =JSON.stringify(result[0].order_update);
                // console.log(xx);
                // console.log('here is orderList result---------')
                // console.log(result);
                cb(null, result);
                // console.log(result)

            })
    },
    // ---------------取得訂單詳情---------------
    getDetail: (order_number, cb) => {
        db.exec('SELECT O.order_list,O.product_id,O.UnitPrice,O.Quantity,O.order_date,P.product_image,P.product_name,P.size_name,P.product_gender,P.product_id from order_items AS O left join products_all AS P on P.product_all_id = O.product_id where order_list = ?',
            [order_number],
            (result, fields, err) => {
                cb(null, result);
            })
    }

}

module.exports = memberModel;
