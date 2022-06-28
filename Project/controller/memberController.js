var memberModel = require('../models/home/memberStatus');


var memberController = {
    personalData: (req, res) => {
        res.render('memberData', {
            title: '會員資料｜個人資料'
        })

    },

    login: (req, res) => {
        res.render('member/login');
    },

    // 驗證登入狀態
    handlelogin: (req, res, next) => {
        var { cAccount, cPassword } = req.body;
        console.log('cAccount');
        console.log(cAccount);
        console.log('userPW');
        console.log(cPassword);
        memberModel.getMemberData(cAccount, cPassword, (err, result) => {
            res.send(`${result.cName} + ${result.cPassword}`)
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
        })
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