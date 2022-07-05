var memberModel = require('../models/home/memberStatus');
var db = require('../dataBase');

var memberController = {
    memberData: (req, res) => {
        var url = req.url;
        // console.log(url);
        res.render('member/memberData', {
            title: '會員資料｜個人資料',
            url
        })
    },
    updateMemberData: (req, res) => {
        var { cPhone, cAddr } = req.body;
        db.exec('update customer_id set cPhone = ? , cAddr = ? where cAccount = ? ',
            [cPhone, cAddr, req.session.memberprofile.cAccount],
            (result, fields, err) => {
                console.log('更新資料');
                req.session.memberprofile.cPhone = cPhone;
                req.session.memberprofile.cAddr = cAddr;
                res.redirect('/home/member/memberData')
                console.log('in');
                console.log(req.session.memberprofile.cPhone)
            })
    },
    changePw: (req, res) => {
        res.render('member/memberData_changePw', {
            title: '會員資料｜變更密碼',
        });
    },
    handlechangePw: (req, res, next) => {
        var { oldpw, newpw, newpwAgain } = req.body;
        console.log(oldpw);
        console.log(newpw);
        console.log(newpwAgain);
        if (!oldpw) {
            req.flash('errorMessage', '舊密碼不可為空')
            return next();
        } else if (!newpw || !newpwAgain) {
            req.flash('errorMessage', '新密碼不可為空')
            return next();
        } else if (req.session.memberprofile.cPassword != oldpw) {
            req.flash('errorMessage', '舊密碼不正確')
            return next();
        } else if (newpw != newpwAgain) {
            req.flash('errorMessage', '新密碼必須為一致')
            return next();
        } else {
            db.exec('update customer_id set cPassword = ? where cAccount = ? ',
                [newpw, req.session.memberprofile.cAccount],
                (result, fields, err) => {
                    console.log('pass database')
                    res.redirect('/home/member/memberData_changePw');
                })
        }
    },

    login: (req, res) => {
        res.render('member/login2');
    },

    // 驗證登入狀態
    handlelogin: (req, res, next) => {
        var { cAccount, cPassword } = req.body;
        if (!cAccount || !cPassword) { req.flash('errorMessage', '請輸入帳密'); return next() }
        // 資料庫撈資料
        db.exec('select * from customer_id where cAccount = ?',
            [cAccount],
            (result, fields, err) => {
                console.log('result.........');
                console.log(result);
                if (result[0]?.cAccount != cAccount) {
                    req.flash('errorMessage', '無此使用者');
                    return next();
                } else if (result[0].cPassword != cPassword) {
                    req.flash('errorMessage', '密碼不正確');
                    return next();
                } else {
                    // 將撈到的資料存入memberprofile session之中
                    req.session.memberprofile = result[0];
                    console.log(req.session.url);
                    res.redirect(req.session.url);
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
    logout: (req, res) => {
        req.session.memberprofile = null;
        res.redirect(req.session.url);
    }

}

module.exports = memberController;