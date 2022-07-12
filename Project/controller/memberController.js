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
        })
    },
    changePw: (req, res) => {
        res.render('member/memberData_changePw', {
            title: '會員資料｜變更密碼',
        });
    },
    handlechangePw: (req, res, next) => {
        var { oldpw, newpw, newpwAgain } = req.body;
        var s_cAccount = req.session.memberprofile.cAccount;
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
            memberModel.memberPwChange({ newpw, s_cAccount }, (err, result) => {
                console.log('already change pw');
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
        memberModel.handlelogin(cAccount, (err, result) => {
            console.log('result.........');
            console.log(result);
            if (!result) {
                req.flash('errorMessage', '無此使用者');
                return next();
            }
            // if (result.cPassword != cPassword) {
            //     req.flash('errorMessage', '密碼不正確');
            //     return next();
            // }
            //    驗證密碼是否正確，三個參數代表: 明碼, 雜湊密碼, 方法
            bcrypt.compare(cPassword, result.cPassword, (err, isSuccess) => {
                if (err || !isSuccess) {
                    req.flash('errorMessage', '密碼錯誤');
                    return next();
                }

                // 將撈到的資料存入memberprofile session之中
                console.log('寫入session');
                req.session.memberprofile = result;
                console.log(req.session.url);
                res.redirect(req.session.url);

            })
        })
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
                    if (err) {
                        console.log(err);    //    輸出資料庫錯誤資訊
                        console.log('register ERROR')
                        emitter.emit("false");    //    返回失敗
                    } else {
                        console.log('register SUCCESS');
                        emitter.emit("ok");    //    返回成功
                        req.session.regi_cAccount = cAccount;
                        console.log(`req.session.regi_cAccount : ${req.session.regi_cAccount}`);
                    }
                })
        });
        // })
    },
    registerCheck: (req, res) => {
        res.render('member/register_success', {
            title: '註冊成功'
        })
    },

    orderList: (req, res) => {
        if (req.session.memberprofile != null) {
            memberModel.getOrder(req.session.memberprofile.cAccount, (err, result) => {
                // console.log(result);
                res.render('member/orderList', {
                    title: '會員資料｜訂單清單',
                    result: result,

                });
            })
        } else {
            res.render('member/orderList', {
                title: '會員資料｜訂單清單',
            })
        }


    }

}

module.exports = memberController;