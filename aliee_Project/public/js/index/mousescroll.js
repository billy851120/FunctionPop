
        var container = document.querySelector('.page-container');
        // 获取浏览器视窗高度
        var viewHeight = document.documentElement.clientHeight;
        console.log(viewHeight);
        // 获取滚动的页数
        var pageNum = 3;
        // 初始化当前位置, 距离原始顶部距离
        var currentPosition = 0;
        // 设置页面高度
        container.style.height = viewHeight + 'px';
    
        // 向下滚动页面
        function goDown() {
            console.log(currentPosition);
            if (currentPosition > - viewHeight * (pageNum - 1)) {
                currentPosition = currentPosition - viewHeight;
                if(viewHeight>900){
                container.style.top = currentPosition + 111 + 'px';
                }else{
                    container.style.top = currentPosition + 92 + 'px';
                }
            }
        }
    
        // 向上滚动页面
        function goUp() {
            if (currentPosition < 0) {
                currentPosition = currentPosition + viewHeight;
                container.style.top = currentPosition + 'px';
            }
        }
    
        // 节流函数
        function throttle(fn, delay) {
            let baseTime = 0;
            return function () {
                const currentTime = Date.now();
                if (baseTime + delay < currentTime) {
                    fn.apply(this, arguments);
                    baseTime = currentTime;
                }
            }
        }
    
        // 初始鼠标滚动
        var handlerWheel = throttle(scrollMove, 10);
        // https://developer.mozilla.org/en-US/docs/Web/API/Element/mousewheel_event#The_detail_property
        // firefox的页面滚动事件其他浏览器不一样
        if (navigator.userAgent.toLowerCase().indexOf('firefox') === -1) {
            document.addEventListener('mousewheel', handlerWheel);
        } else {
            document.addEventListener('DOMMouseScroll', handlerWheel);
        }
        function scrollMove(e) {
            if (e.deltaY > 0) {
                goDown();
            } else {
                goUp();
            }
        }
    
        //參考網站 : https://cloud.tencent.com/developer/article/1685617