var memberModel = require('../models/home/memberModel');
var db = require('../dataBase');
var bcrypt = require('bcrypt');
var saltRounds = 10; // 增加密碼複雜程度
var events = require(`events`);
var emitter = new events.EventEmitter();


var memberController = {
    memberData: (req, res) => {
        // console.log(url);
        res.render('member/memberData', {
            title: '會員資料｜個人資料',
        })
    },
    updateMemberData: (req, res) => {
        var { cPhone, cAddr } = req.body;
        var s_cAccount = req.session.memberprofile.cAccount;
        console.log('input');
        console.log(cPhone);
        console.log(cAddr);
        memberModel.updateMemberData({ cPhone, cAddr, s_cAccount }, (err) => {

            console.log('更新資料');
            req.session.memberprofile.cPhone = cPhone;
            req.session.memberprofile.cAddr = cAddr;
            res.redirect('/home/member/memberData')
            console.log('in');
            // console.log(req.session.memberprofile.cPhone)
        })
        // db.exec('update customer_id set cPhone = ? , cAddr = ? where cAccount = ? ',
        //     [cPhone, cAddr, req.session.memberprofile.cAccount],
        //     (result, fields, err) => {
        //         console.log('更新資料');
        //         req.session.memberprofile.cPhone = cPhone;
        //         req.session.memberprofile.cAddr = cAddr;
        //         res.redirect('/home/member/memberData')
        //         console.log('in');
        //         console.log(req.session.memberprofile.cPhone)
        //     })
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
    },

    register: (req, res) => {
        console.log(req.session.url);
        res.render('register', {

        });
    },

    handleregister: (req, res, next) => {
        var { cPassword, cName, cBirth, cgender, cAccount, cPhone, cAddr } = req.body; //    監聽資料庫寫入返回的引數
        emitter.on("ok", function () {
            return res.end("ok");    //    向前臺返回資料
        });
        emitter.on("false", function () {
            return res.end("電子郵件已有人使用");    //    向前臺返回資料
        });

        console.log(`body.cPassword: ${cPassword}`);

        bcrypt.hash(cPassword, saltRounds, (err, hash) => {
            if (err) {
                req.flash('errorMessage', err.toString());
                return next();
            }

            memberModel.add_member({ cName, cBirth, cgender, cAccount, cPhone, cAddr, cPassword: hash },
                (err) => {
                    console.log('register SUCCESS');
                    emitter.emit("ok");    //    返回成功
                    console.log(req.session.url);
                    // res.redirect(req.session.url);
                })

            // var sql = "insert into customer_id(cName,cBirth,cgender,cAccount,cPhone,cAddr,cPassword) values(?,?,?,?,?,?,?)"; //向user這個表裡寫入資料
            // var data = [body.cName, body.cBirth, body.cgender, body.cAccount, body.cPhone, body.cAddr, body.cPassword: hash];
            // db.exec(sql, [body.cName, body.cBirth, body.cgender, body.cAccount, body.cPhone, body.cAddr, body.cPassword], (results, fields, err) => {    //    執行sql語句
            // if (err) {
            //     console.log(err.message);    //    輸出資料庫錯誤資訊
            //     emitter.emit("false");    //    返回失敗
            // }

        });
        // })
    }

}

module.exports = memberController;