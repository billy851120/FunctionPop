
var container = document.querySelector('.page-container');
var viewHeight = document.documentElement.clientHeight;
container.style.height = viewHeight + 'px';

const $body = (window.opera) ? (document.compatMode == "CSS1Compat" ? $('html') : $('body')) : $('html,body'),
    $section = $('section');
var dd = $(".gg")

// console.log($section.eq(curPage));
var numOfPages = 5, //取得section的數量
    curPage = 0, //初始頁
    scrollLock = false;


    if($("#pagethree").css("height")> document.documentElement.clientHeight){
        numOfPages = 4;
    }
function scrollPage() {
    //滑鼠滾動
    console.log(curPage);
    $(document).on("mousewheel DOMMouseScroll", function (e) {
        if (scrollLock) return;
        if (e.originalEvent.wheelDelta > 0 || e.originalEvent.detail < 0)
            navigateUp();
        else
            navigateDown();
    });
    //鍵盤上下鍵
    $(document).on("keydown", function (e) {
        if (scrollLock) return;
        if (e.which === 38)
            navigateUp();
        else if (e.which === 40)
            navigateDown();
    });
}

function pagination() {
    scrollLock = true;
    console.log(dd.eq(parseInt(curPage/2)));
    if ((curPage == 0) || (curPage == 2) || (curPage == 4)) {
        $body.stop().animate({
            scrollTop: dd.eq(parseInt(curPage/2)).offset().top
        }, 1000, 'swing', function () {
            scrollLock = false;
        });
    } else {
        $body.stop().animate({
            scrollTop: dd.eq(parseInt(curPage/2)).offset().top + (document.documentElement.clientHeight / 2)
        }, 1000, 'swing', function () {
            scrollLock = false;
        });

    }
    if((curPage == 2)||(curPage == 3)){
        doAnimateShow();
    }else{
        doAnimateHide();
    }
};

function navigateUp() {
    if (curPage === 0) return;
    curPage--;
    pagination();
};

function navigateDown() {
    if (curPage === numOfPages) return;
    curPage++;
    pagination();
};


$(function () {
    document.getElementById("story").style.top = "-100px";
    scrollPage();
});
// console.log(curPage);

function doAnimateShow() {
    document.getElementById("story").style.top = "15px";
}

function doAnimateHide() {
    document.getElementById("story").style.top = "-100px";
    event.cancelBubble=true;
}

// document.getElementById("boxclose").onclick = doAnimateHide;

// document.onclick = doAnimateShow;