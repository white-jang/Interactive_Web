let prev_button, next_button;
let contentWrap;
let disk_inner;
let pageNum = 0;
let totalNum = 0;
let album;
let pointBtnAll;
let bgArray = new Array();
bgArray[0] = ["#0272a4", "#f6a564"];
bgArray[1] = ["#b6bfc8", "#36595b"];
bgArray[2] = ["#e58e82", "#6f569f"];

window.onload = function () {
    prev_button = document.querySelectorAll("button")[0];
    next_button = document.querySelectorAll("button")[1];

    contentWrap = document.querySelector(".contentWrap");
    disk_inner = document.querySelectorAll(".disk_inner");
    album = document.querySelectorAll(".album");

    pointBtnAll = document.querySelectorAll(".pointWrap li");
    totalNum = album.length;

    prev_button.addEventListener("click", function () {
        if (pageNum > 0) {
            pageNum--;
        } else {
            pageNum = totalNum - 1;
        }
        pageChangeFunc();
    })

    next_button.addEventListener("click", function () {
        if (pageNum < totalNum - 1) {
            pageNum++;
        } else {
            pageNum = 0;
        }
        pageChangeFunc();
    })

    for (let i = 0; i < pointBtnAll.length; i++) {
        (function (idx) {
            pointBtnAll[idx].onclick = function () {
                // alert(idx);
                pageNum = idx;
                pageChangeFunc();
            }
        })(i);
    }

    if (mobileChk()) {
        // 컨텐츠랩 전체에 이벤트 리스너를 등록 
        // 터치를 시작 = touchstart, 손을 뗌 = touchend
        contentWrap.addEventListener("touchstart", touchFunc, false);
        // contentWrap.addEventListener("touchmove", touchFunc, false);
        contentWrap.addEventListener("touchend", touchFunc, false);
    }

    let start_X = 0;
    let end_X = 0;

    function touchFunc(evt) {

        let type = null;
        let touch = null;

        switch (evt.type) {
            case "touchstart":
                type = "mousedown";
                touch = evt.changedTouches[0];
                start_X = touch.clientX; // 터치한 곳의 x좌표
                end_X = 0;
                break;
                // case "touchmove":
                //     type = "mousemove";
                //     touch = evt.changedTouches[0];
                //     console.log(touch)
                // break;
            case "touchend":
                type = "mouseup";
                touch = evt.changedTouches[0];
                end_X = touch.clientX;

                let chkNum = start_X - end_X;
                let chkNumAbs = Math.abs(chkNum); // 절댓값

                if (chkNumAbs > 100) {
                    // 터치를 많이 했으면 실행
                    if (chkNum < 0) {
                        // 왼쪽으로 터치 = 양수
                        if (pageNum > 0) {
                            pageNum--;
                        } else {
                            pageNum = totalNum - 1;
                        }
                    } else {
                        // 오른쪽으로 터치 = 음수
                        if (pageNum < totalNum - 1) {
                            pageNum++;
                        } else {
                            pageNum = 0;
                        }
                    }
                    pageChangeFunc();
                }
                break;
        }
    }

    pageChangeFunc();
}

//여기서 모든 것을 한다.
function pageChangeFunc() {

    console.log(pageNum)

    contentWrap.style.background = "linear-gradient(120deg," + bgArray[pageNum][0] + ", " + bgArray[pageNum][1] + ")";

    for (let i = 0; i < totalNum; i++) {
        if (pageNum == i) {
            album[i].classList.add("active");
            pointBtnAll[i].classList.add("active");
        } else {
            album[i].classList.remove("active");
            pointBtnAll[i].classList.remove("active");
        }
    }

    disk_inner[pageNum].style.background = bgArray[pageNum][0];
}


function mobileChk() {
    // userAgent가 모바일일 경우에 true 반환 (모바일 체크)
    let mobileKeyWords = new Array('Android', 'iPhone', 'iPod', 'BlackBerry', 'Windows CE', 'SAMSUNG', 'LG', 'MOT', 'SonyEricsson');
    for (let info in mobileKeyWords) {
        if (navigator.userAgent.match(mobileKeyWords[info]) != null) {
            return true;
        }
    }
    return false;
}