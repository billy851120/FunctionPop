// 讀取購物車功能 :
//更新總數量
function updateCount() {
  var total_count = 0;
  $("#css_tbody .product input[class='ck']:checked").each(function (idx, ele) {
    total_count += parseInt(
      $(ele).parent().parent().parent().find('#number').val()
    );
  });
  $('#total_count').text(total_count.toString());
}
//更新總價格
function updateAllPrice() {
  //更新總小記
  var total_price = 0;
  $("#css_tbody .product input[class='ck']:checked").each(function (idx, ele) {
    total_price += parseInt(
      $(ele).parent().parent().parent().find('.to_price').text()
    );
  });
  $('#total_price').text(total_price.toString());

  //更新運費
  var fare = 1000;
  if (total_price >= fare) {
    $('#fare').html('0');
    $('#canFare').html('<p>免費標準運送。</p>');
  } else {
    var diff = 0;
    diff = fare - total_price;
    $('#fare').html('60');
    $('#canFare ').html(
      `只差NT$ <span>${diff.toString()}</span>，即可享有免費標準運送。`
    );
  }

  //更新總額
  var P_fare = parseInt($('#fare').html());
  var allPrice = 0;
  allPrice = P_fare + total_price;
  $('#tototoPrice').html(allPrice.toString());
}
function updateFare() {}
