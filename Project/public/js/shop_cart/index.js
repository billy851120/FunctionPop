$(function () {
  var ccount = document.getElementById('cart_count'); //顯示所有商品標籤節點

  var listStr = cookieObj.get('datas');

  if (!listStr) {
    cookieObj.set({
      name: 'datas',
      value: '[]',
    });
    listStr = cookieObj.get('datas');
  }

  var listObj = JSON.parse(listStr); //轉JSON格式

  // 遍歷陣列，獲取每個物件中的pCount值相加總合
  var totalCount = 0;
  for (var i = 0, len = listObj.length; i < len; i++) {
    totalCount = listObj[i].pCount + totalCount;
    // console.log(totalCount);
  }
  ccount.innerHTML = totalCount;

  //  衣服顏色選擇
  $('.shop').find('.pcolor a:first-child').addClass('pcolor-active');
  $('.pcolor').on('click', 'a', function () {
    $('.pcolor a').removeClass('pcolor-active');
    $(this).addClass('pcolor-active');
  });

  //  衣服尺寸選擇
  $('.psize').on('click', 'button', function () {
    $('.psize button').removeClass('psize-active');
    $(this).addClass('psize-active');
  });

  // 件數增加
  $('.pcount')
    .find('.add')
    .on('click', function () {
      var num = $(this).siblings('.number').val();
      num++;
      $(this).siblings('.number').val(num);
    });
  //件數減少
  $('.pcount')
    .find('.sub')
    .on('click', function () {
      var num = $(this).siblings('.number').val();
      num--;
      if (num <= 1) {
        num = 1;
      }
      $(this).siblings('.number').val(num);
    });

  $('.buy').click(function () {
    // console.log($(this).attr('data-pid'));
    // console.log($(this).parent().parent().find('.number').val());
    var pid = $(this).attr('data-pid');
    var imgSrc = $(this).parent().find('img').attr('src');
    var pName = $(this).parent().find('.pname').text();
    var pDesc = $(this).parent().find('.pdesc').text();
    var price = $(this).parent().find('.price span').text();
    var pCount = parseInt($(this).parent().find('.number').val());
    var pSize = $(this).parent().find('.psize-active').text();
    var pColor = $(this).parent().find('.pcolor-active').text();
    var pColor_ch = false;
    var pSize_ch = false;

    $(this)
      .parent()
      .find('.pcolor a')
      .each(function (idx, ele) {
        if ($(ele).hasClass('pcolor-active')) {
          pColor_ch = true;
        }
      });
    $(this)
      .parent()
      .find('.psize button')
      .each(function (idx, ele) {
        if ($(ele).hasClass('psize-active')) {
          pSize_ch = true;
        }
      });

    // console.log(pSize_ch);
    //判斷尺寸和顏色是否選擇
    if (pColor_ch && pSize_ch) {
      if (checkObjByPid(pid)) {
        listObj = updateObjById(pid, pCount);

        // console.log(typeof pCount);
      } else {
        var obj = {
          pid: pid,
          pImg: imgSrc,
          pName: pName,
          pDesc: pDesc,
          pSize: pSize,
          pColor: pColor,
          price: price,
          pCount: pCount,
        };
        listObj.push(obj);
        listObj = updateData(listObj);
      }
      // var a = getAllData();
      ccount.innerHTML = getTotalCount();
      // console.log('商品1' + a[0].pCount);
      // console.log('商品2' + a[1].pCount);
    } else {
      if ($('.al').length == 0) {
        var al = document.createElement('div');
        console.log(al);
        al.innerHTML = '請選擇尺寸';
        $(al).attr('class', 'al fadeInDown');
        document.body.appendChild(al);
      }

      setTimeout(function () {
        $(al).attr('class', 'al fadeOutUp');
      }, 2000);
      setTimeout(function () {
        $(al).remove();
      }, 2200);
    }
  });
});
