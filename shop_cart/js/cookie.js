var cookieObj = {
  //cookie設值
  set: function (x) {
    var cookieStr =
      encodeURIComponent(x.name) + '=' + encodeURIComponent(x.value);
    if (x.expires) {
      cookieStr += ';expires=' + x.expires;
    }
    if (x.path) {
      cookieStr += ';path=' + x.path;
    }
    if (x.domain) {
      cookieStr += ';domain' + x.domain;
    }
    if (x.secure) {
      cookieStr += ';secure';
    }
    // console.log(x);
    document.cookie = cookieStr;
  },

  //cookie取值
  get: function (x) {
    x = encodeURIComponent(x);
    var cookieTotal = document.cookie;
    var cookies = cookieTotal.split(';');
    for (let i = 0, len = cookies.length; i < len; i++) {
      var arr = cookies[i].split('=');
      if (x == arr[0]) {
        return decodeURIComponent(arr[1]);
      }
    }
  },

  //刪除cookie
  del: function (x) {
    var date = new Date();
    date.setMonth(-5);
    console.log(this);
    this.set({
      name: x,
      expires: date,
    });
  },
};
