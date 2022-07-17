var productModel = require('../models/home/productModel');

var productController = {

    getAll: (req, res) => {
        productModel.getAll((err, result) => {
            
            console.log("MMO");
            res.render('shop', { result: result });
        })
    },





}

module.exports=productController;