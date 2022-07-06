var productModel = require('../models/home/productModel');

var productController = {

    getAll: (req, res) => {
        productModel.getAll((err, result) => {
<<<<<<< HEAD
            
=======
            console.log("MMO");
>>>>>>> c55788f0800e7110416ac4058e8bc08ffc1a8ecd
            res.render('shop', { result: result });
        })
    },





}

module.exports=productController;