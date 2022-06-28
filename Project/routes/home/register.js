var express = require('express');
var db = require('../../dataBase');
var bodyParser = require('body-parser');
var router = express.Router();
router.use(bodyParser.json());

router.get('/' ,function(req,res){
    res.render('register',{})
})
    
router.post('/', function (req, res) {
    var body = req.body;
    var sql = "INSERT INTO customer_id(cName,cBirth,cgender,cAccount,cPhone,cAddr) values(?,?,?,?,?,?)";    //    向user這個表裡寫入資料
    var data = [body.cName, body.cBirth, body.cgender, body.cAccount, body.cPhone, body.cAddr];
    db.exec(sql, data, function(results, fields,err){
      console.log("請求...");
      if(err){
        console.log("失敗 sqlMessage:"+err.sqlMessage);
         return res.status(400).json({
          success:false,
          error : "壞了"
    
        })
      }else{ 
        
        console.log("成功");
        return res.status(200).send("安安")
    }
    
    });
  
  })




  module.exports = router;

  
