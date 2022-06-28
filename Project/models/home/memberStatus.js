var db=require('../../dataBase');

var memberModel={
    personalData: (cb) => {
       
    },

    getMemberData:(cAccount,cPassword,cb)=>{
        db.exec('select * from customer_id where cAccount = ?', [cAccount], (err, result) => {
            console.log(`result : ${result[0]}`);
            console.log(`cPassword : ${result[0].cPassword}`);
            if (err) return cb(err);
            cb(null, result[0]);
        });
    }

}

module.exports=memberModel;
