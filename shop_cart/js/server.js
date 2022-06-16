//檢查本地數據中有沒有指定的物件，根據id

function checkObjByPid(id) {
  var jsonStr = cookieObj.get('datas');
  var jsonObj = JSON.parse(jsonStr);
  var isExist = false;
  for (var i = 0, len = jsonObj.length; i < len; i++) {
    if (jsonObj[i].pid == id) {
      isExist = true;
      break;
    }
  }
  return isExist;
}

/* 功能:更新本地數據
  參數: arr
  返回一個值: 最新的本地轉換後的數組物件
  */
function updateData(arr) {
  var jsonStr = JSON.stringify(arr);
  cookieObj.set({
    name: 'datas',
    value: jsonStr,
  });
  jsonStr = cookieObj.get('datas');
  return JSON.parse(jsonStr);
}

/* 
獲取商品的總數量
返回:數字
*/
function getTotalCount() {
  var totalCount = 0;
  var jsonStr = cookieObj.get('datas');
  var listObj = JSON.parse(jsonStr);
  for (var i = 0, len = listObj.length; i < len; i++) {
    totalCount = listObj[i].pCount + totalCount;
  }
  return totalCount;
}

/* 
根據pid，更新本地數據
id:商品的標示
*/

function updateObjById(id, num) {
  var jsonStr = cookieObj.get('datas');
  var listObj = JSON.parse(jsonStr);
  for (var i = 0, len = listObj.length; i < len; i++) {
    var pcot = parseInt(listObj[i].pCount);
    if (listObj[i].pid == id) {
      listObj[i].pCount = pcot + num;

      break;
    }
  }
  return updateData(listObj);
}

/*
獲取本地數據
返回 數組物件 
*/
function getAllData() {
  var jsonStr = cookieObj.get('datas');
  var listObj = JSON.parse(jsonStr);
  return listObj;
}

//刪除商品
function deleteObjByPid(id) {
  var lisObj = getAllData();
  for (var i = 0, len = lisObj.length; i < len; i++) {
    if (lisObj[i].pid == id) {
      lisObj.splice(i, 1);
      break;
    }
  }
  updateData(lisObj);
  return lisObj;
}

// var a = getAllData();
// console.log(a[0]);
// console.log(a[1]);
