
var container = document.querySelector('.page-container');
var viewHeight = document.documentElement.clientHeight;
container.style.height = viewHeight + 'px';

const $body = (window.opera) ? (document.compatMode == "CSS1Compat" ? $('html') : $('body')) : $('html,body'),
    $section = $('section');
var dd = $(".gg")

// console.log($section.eq(curPage));
var numOfPages = 9, //取得section的數量
    curPage = 0, //初始頁
    scrollLock = false;


if ($("#pagethree").css("height") > document.documentElement.clientHeight) {
    numOfPages = 4;
}
function scrollPage() {
    //滑鼠滾動
    // console.log(curPage);
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
    // console.log(dd.eq(parseInt(curPage / 2)));
    if ((curPage == 0) || (curPage == 2) || (curPage == 4)|| (curPage == 6)|| (curPage == 8)) {
        $body.stop().animate({
            scrollTop: dd.eq(parseInt(curPage / 2)).offset().top
        }, 800, 'swing', function () {
            scrollLock = false;
        });
    } else {
        $body.stop().animate({
            scrollTop: dd.eq(parseInt(curPage / 2)).offset().top + (document.documentElement.clientHeight / 2)
        }, 800, 'swing', function () {
            scrollLock = false;
        });

    }
    if ((curPage == 2) || (curPage == 3)) {
        doAnimateShowh();
    } else {
        doAnimateHideh();
    }
    if ((curPage == 4) || (curPage == 5)) {
        doAnimateShow();
    } else {
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
    console.log("rrrr")
    document.getElementById("story").style.top = "-100px";
    document.getElementById("history").style.top = "-100px";
    scrollPage();
});

function doAnimateShow() {
    console.log("shi")
    document.getElementById("story").style.top = "15px";
    if (window.innerWidth < 577) {
        document.getElementById("story").style.top = "45px";
    }
    if (window.innerWidth >= 577) {
        document.getElementById("story").style.top = "15px";
    }
    window.addEventListener('resize', start);

        function start() {
            if ((curPage == 4) || (curPage == 5)) {
            if (window.innerWidth < 577) {
                document.getElementById("story").style.top = "45px";
            }
            if (window.innerWidth >= 577) {
                document.getElementById("story").style.top = "15px";
            }}
        }
}

function doAnimateHide() {
    document.getElementById("story").style.top = "-100px";
    event.cancelBubble = true;
}
function doAnimateShowh() {
    console.log("shii")
    document.getElementById("history").style.top = "15px";
    if (window.innerWidth < 577) {
        document.getElementById("history").style.top = "45px";
    }
    if (window.innerWidth >= 577) {
        document.getElementById("history").style.top = "15px";
    }
    window.addEventListener('resize', start);

        function start() {
            if ((curPage == 2) || (curPage == 3)) {
            if (window.innerWidth < 577) {
                document.getElementById("history").style.top = "45px";
            }
            if (window.innerWidth >= 577) {
                document.getElementById("history").style.top = "15px";
            }}
        }
}

function doAnimateHideh() {
    document.getElementById("history").style.top = "-100px";
    event.cancelBubble = true;
}

$("#gotop").click(function () {
    jQuery("html,body").animate({
        scrollTop: 0
    }, 1000);
    curPage = 0;
});
$(window).scroll(function () {
    if ($(this).scrollTop() > 300) {
        $('#gotop').fadeIn("fast");
    } else {
        $('#gotop').stop().fadeOut("fast");
    }
});

console.log(document.documentElement.scrollHeight);
$("#godown").click(function () {
    jQuery("html,body").animate({
        scrollTop: document.documentElement.scrollHeight
    }, 1000);
    curPage = 9;
});
$(window).scroll(function () {
    if ($(this).scrollTop() < document.documentElement.scrollHeight-900) {
        $('#godown').fadeIn("fast");
    } else {
        $('#godown').stop().fadeOut("fast");
    }
});