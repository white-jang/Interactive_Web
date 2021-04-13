let prev_button, next_button;
let contentWrap;
let disk_inner;
let pageNum = 0; // 페이지의 넘버
let totalNum = 0; // 페이지의 토탈 넘버
let album;
let pointBtnAll;
// 색상 값 배열
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
    totalNum = album.length;

    prev_button.addEventListener("click", function () {
        if (pageNum > 0) {
            pageNum--;
        } else {
            pageNum = totalNum - 1;
        }
        pageChangeFunc();
    });

    next_button.addEventListener("click", function () {
        if (pageNum < totalNum - 1) {
            pageNum++;
        } else {
            pageNum = 0;
        }
        pageChangeFunc();
    });

    // 최초 실행
    // 페이지가 열리면 자동으로 한 번 실행
    pageChangeFunc();
};

//여기서 모든 것을 한다.
function pageChangeFunc() {
    // console.log(bgArray[pageNum][1])
    contentWrap.style.background = "linear-gradient(120deg," + bgArray[pageNum][0] + ", " + bgArray[pageNum][1] + ")";

    for (let i = 0; i < totalNum; i++) {
        if (pageNum == i) {
            //현재 컨텐츠
            album[i].classList.add("active");
        } else {
            album[i].classList.remove("active");
        }
    }

    disk_inner[pageNum].style.background = bgArray[pageNum][0];
}