var memberModel = require('../models/home/memberStatus');
var db = require('../dataBase');

var memberController = {
    personalData: (req, res) => {
        res.render('memberData', {
            title: '會員資料｜個人資料'
        })

    },

    login: (req, res) => {
        res.render('member/login2');
    },

    // 驗證登入狀態
    handlelogin: (req, res, next) => {
        var { cAccount, cPassword } = req.body;
        if (!cAccount || !cPassword) { req.flash('errorMessage', '請輸入帳密'); return next() }

        db.exec('select * from customer_id where cAccount = ?', [cAccount], (result, err, zzz) => {
            console.log('result.........');
            console.log(result);
            if (result[0]?.cAccount != cAccount) {
                req.flash('errorMessage', '無此使用者');
                return next();
            } else if (result[0].cPassword != cPassword) {
                req.flash('errorMessage', '密碼不正確');
                return next();  
            } else{
             
                req.session.memberprofile = result[0];
                // res.send('login success');
                // console.log(username)
                res.redirect('/member/memberData');
            }
        });

        // res.send(result[0].cAccount)
        //             if (err) {
        //                 req.flash('errorMessage', err.toString());
        //                 return next();
        //             }
        //             if (!cAccount) {
        //                 req.flash('errorMessage', '使用者不存在');
        //                 return next();
        //             }
        // if(cAccount===)
        // 驗證密碼是否正確，三個參數代表: 明碼, 雜湊密碼, 方法
        // bcrypt.compare(password, user.password, (err, isSuccess) => {
        //     if (err || !isSuccess) {
        //         req.flash('errorMessage', '密碼錯誤');
        //         return next();
        //     }
        //     req.session.username = user.username;
        //     req.session.nickname = user.nickname;
        //     res.redirect('/');
        // });

    },
    logout:(req,res)=>{
        req.session.memberprofile=null;
        res.redirect('/member/memberData');
    },

    frame7: (rqs, res) => {
        res.render('frame7', { title: '會員資料｜我的最愛' });
    },

    frame8: (rqs, res) => {
        res.render('frame8', { title: '會員資料｜我的最愛' });
    },

    frame9: (rqs, res) => {
        res.render('frame9', { title: '會員資料｜我的最愛' });
    },

    test3: (rqs, res) => {
        res.render('test3', { title: '會員資料｜我的最愛' });
    }



}

module.exports = memberController;