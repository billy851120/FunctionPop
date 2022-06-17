var listStr = cookieObj.get('datas');
var allCk = document.querySelector('.to_ck');
var updateObj = JSON.parse(listStr);
var totalPrice = document.getElementById('total_price');
var total_count = document.getElementById('total_count');

var listObj = getAllData();
var addPid = $('.add_pid').html();
for (var i = 0, len = listObj.length; i < len; i++) {
  // var tr = document.createElement('tr');
  // tr.setAttribute('data-pid', listObj[i].pid);
  // tr.innerHTML = `<th colspan="2" scope="row">
  //                     <input type="checkbox" class="ck"  checked/>
  //                     <img
  //                     class="pImg"
  //                     style="width: 100%"
  //                     src="${listObj[i].pImg}"
  //                     alt=""
  //                   />
  //                   </th>
  //                   <td colspan="2" >
  //                   <p class="pDesc" style="margin-bottom: 10px;">${
  //                     listObj[i].pDesc
  //                   }</p>
  //                   <p class="pColor">顏色:${listObj[i].pColor}</p>
  //                   <p class="pSize">尺寸:${listObj[i].pSize}</p>
  //                   </td>
  //                   <td class="price align-middle">NT$<span>${
  //                     listObj[i].price
  //                   }</span></td>
  //                   <td  class="pCount align-middle">
  //                     <a
  //                       href="#"
  //                       class="sub"
  //                       style="padding: 4px; border: 1px solid #000"
  //                       >-</a
  //                     >
  //                     <input
  //                       type="text"
  //                       id="number"
  //                       value="${listObj[i].pCount}"
  //                       style="width: 50px; text-align: center"
  //                     />
  //                     <a
  //                       href="#"
  //                       class="add"
  //                       style="padding: 4px; border: 1px solid #000"
  //                       >+</a
  //                     >
  //                   </td>
  //                   <td class="to_price align-middle">NT$<span>${
  //                     listObj[i].price * listObj[i].pCount
  //                   }</span> </td>
  //                   <td class="align-middle"><a href="#" class="del">移除</a></td>`;

  var tr = document.createElement('div');
  $(tr).attr('class', 'css_trr row ');
  $(tr).attr('data-pid', listObj[i].pid);

  console.log(tr);
  tr.innerHTML = ` 
  <div  class="col-2 css_tb ">
    <input type="checkbox" class="ck" checked />
    <img
      class="pImg"
      style="width: 100%"
      src="${listObj[i].pImg}"
      alt=""
    />
  </div>
  <div  class="col-3 css_tb ">
    <p class="pDesc" style="margin-bottom: 10px;">${listObj[i].pDesc}</p>
    <p class="pColor">顏色:${listObj[i].pColor}</p>
    <p class="pSize">尺寸:${listObj[i].pSize}</p>
  </div>
  <div class="col-2 css_tb  price align-self-center">NT$<span>${
    listObj[i].price
  }</span></div>
  <div class="col-2 css_tb  pCount align-self-center">
 
  <a
      href="#"
      class="sub"
      style="padding: 2px; border: 1px solid #000"
      >-</a
    >
    <input
      type="text"
      id="number"
      value="${listObj[i].pCount}"
      style="width: 25px; text-align: center"
    />
    <a
      href="#"
      class="add"
      style="padding: 2px; border: 1px solid #000"
      >+</a
    >
  
    </div>
  <div class="col css_tb  to_price align-self-center">NT$<span>${
    listObj[i].price * listObj[i].pCount
  }</span> </div>
  <div class="col css_tb  align-self-center"><a href="#" class="del"><i class="fa-solid fa-trash-can"></i></a></div>
 `;

  console.log(tr);

  css_tbody.appendChild(tr);
  total_count.innerHTML = getTotalCount();
  total_price.innerHTML = getTotalPrice();
}

//商品增加
$('.add').click(function () {
  var num = 0;
  num++;
  var pid = $(this).parent().parent().attr('data-pid');
  console.log(pid);

  var Count = parseInt($(this).siblings('#number').val());
  var to_Count = parseInt(Count + num);
  var price = parseInt($(this).parent().parent().find('.price span').html());
  var toPrice = to_Count * price;
  $(this).siblings('#number').val(to_Count);
  $(this).parent().parent().find('.to_price span').text(toPrice);
  // console.log(price);

  $(this).siblings('#number').val();
  if (checkObjByPid(pid)) {
    listObj = updateObjById(pid, 1);

    // console.log(typeof pCount);
  }
  listObj = updateData(listObj);
  total_count.innerHTML = getTotalCount();
  total_price.innerHTML = getTotalPrice();
  // console.log(to_Count);
  // console.log('商品1  ' + listObj[0].pCount);
  // console.log('商品2  ' + listObj[1].pCount);
});

//商品減少
$('.sub').click(function () {
  var pid = $(this).parent().parent().attr('data-pid');
  var Count = parseInt($(this).siblings('#number').val());
  Count--;
  if (Count < 1) {
    Count = 1;
  } else {
    $(this).siblings('#number').val(Count);
    var price = parseInt($(this).parent().parent().find('.price span').html());
    var toPrice = Count * price;
    $(this).parent().parent().find('.to_price span').text(toPrice);

    // console.log(pid);
    if (checkObjByPid(pid)) {
      listObj = updateObjById(pid, -1);
    }
    listObj = updateData(listObj);
    total_count.innerHTML = getTotalCount();
    total_price.innerHTML = getTotalPrice();
    // console.log(Count);
    // console.log('商品1  ' + listObj[0].pCount);
    // console.log('商品2  ' + listObj[1].pCount);
  }
});

//計算總金額
var cks = document.querySelectorAll('.ck');
function getTotalPrice() {
  cks = document.querySelectorAll('.ck');
  var sum = 0;
  for (var i = 0; i < cks.length; i++) {
    if (cks[i].checked) {
      var tr = cks[i].parentNode.parentNode;
      var temp = tr.children[4].firstElementChild.innerHTML;
      console.log(temp);
      sum = Number(temp) + sum;
    }
  }
  return sum;
}

for (let i = 0, len = cks.length; i < len; i++) {
  cks[i].onchange = function () {
    checkAllChecked();
    total_price.innerHTML = getTotalPrice();
  };
}

//全選
allCk.onchange = function () {
  for (let i = 0, len = cks.length; i < len; i++) {
    cks[i].checked = allCk.checked;
  }
  totalPrice.innerHTML = getTotalPrice();
};
//檢測全選
function checkAllChecked() {
  var isSelected = true;
  for (let i = 0, len = cks.length; i < len; i++) {
    if (cks[i].checked == false) {
      isSelected = false;
    }
  }
  allCk.checked = isSelected;
}

//刪除商品
var del = document.querySelectorAll('.del');
for (let i = 0, len = del.length; i < len; i++) {
  del[i].onclick = function () {
    var tr = this.parentNode.parentNode;
    var pid = tr.getAttribute('data-pid');

    if (confirm('確定刪除?')) {
      tr.remove();
      listObj = deleteObjByPid(pid);
    }
    total_count.innerHTML = getTotalCount();

    totalPrice.innerHTML = getTotalPrice();
  };
}
