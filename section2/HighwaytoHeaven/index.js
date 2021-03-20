let section = document.getElementsByTagName("section");
let pointBtn = document.querySelectorAll(".pointWrap li");
let pageNum = 0;
let totalNum = section.length;

for (let i = 0; i < pointBtn.length; i++) {
    (function (idx) {
        pointBtn[idx].onclick = function () {
            pageNum = idx;
            pageChangeFunc();
            window.scrollTo({
                top: section[pageNum].offsetTop,
                behavior: 'smooth',
            });
        }
    })(i);
}

//스크롤 이벤트
window.addEventListener("scroll", function (event) {
    let scroll = this.scrollY;

    for (let i = 0; i < totalNum; i++) {
        if (scroll > section[i].offsetTop - window.outerHeight / 1.5 && scroll < section[i]
            .offsetTop - window.outerHeight / 1.5 + section[i].offsetHeight) {
            pageNum = i;
            break;
        }
    }
    pageChangeFunc();
});


//페이지 변경
function pageChangeFunc() {
    for (let i = 0; i < totalNum; i++) {
        section[i].classList.remove("active");
        // section[i].className = "";
        pointBtn[i].classList.remove("active");
    }
    section[pageNum].classList.add("active");
    pointBtn[pageNum].classList.add("active");

}

//페이지 로드되면 바로 실행
pageChangeFunc();