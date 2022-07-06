var db = require('../../dataBase');
var session = require('express-session');

var shop_cartModel = {
  isProductInCart: (cart, all_id) => {
    for (let i = 0; i < cart.length; i++) {
      if (cart[i].all_id == all_id) {
        return true;
      }
    }

    return false;
  },

  updateCartCount: (cart, req) => {
    let count = 0;
    for (let i = 0; i < cart.length; i++) {
      if (cart[i].quantity) {
        count += parseInt(cart[i].quantity);
      } else {
        count += parseInt(cart[i].quantity);
      }
    }
    req.session.cartCount = count.toString();
    return count;
  },

  calculateTotal: (cart, req) => {
    total = 0;
    for (let i = 0; i < cart.length; i++) {
      // if we are offering a discounted price
      if (cart[i].price) {
        total = total + cart[i].price * cart[i].quantity;
      } else {
        total = total + cart[i].price * cart[i].quantity;
      }
    }
    req.session.total = total;
    return total;
  },

  //   addToCart: (cartt, req, all_id, quantity, product) => {
  //     if (cartt) {
  //       var cart = cartt;
  //       if (isProductInCart(cart, all_id)) {
  //         for (let i = 0; i < cart.length; i++) {
  //           let ct = 0;
  //           if (cart[i].all_id == all_id) {
  //             ct = parseInt(cart[i].quantity) + parseInt(quantity);
  //             cart[i].quantity = ct.toString();
  //             // console.log(cart);
  //           }
  //         }
  //       } else {
  //         cart.push(product);
  //         // console.log(cart);
  //       }
  //     } else {
  //       req.session.cart = [product];
  //       var cart = cartt;
  //     }
  //   },
};

module.exports = shop_cartModel;
