var memberModel = require('../models/home/memberStatus');


var memberController = {
    personalData: (req, res) => {
        res.render('memberData', {
            title: '會員資料｜個人資料'
        })

    },

    login:(req,res)=>{
        res.render('member/login');
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