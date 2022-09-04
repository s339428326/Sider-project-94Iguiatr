"use strict";

AOS.init({
  // Global settings:
  disable: false,
  // accepts following values: 'phone', 'tablet', 'mobile', boolean, expression or function
  startEvent: "DOMContentLoaded",
  // name of the event dispatched on the document, that AOS should initialize on
  initClassName: "aos-init",
  // class applied after initialization
  animatedClassName: "aos-animate",
  // class applied on animation
  useClassNames: false,
  // if true, will add content of `data-aos` as classes on scroll
  disableMutationObserver: false,
  // disables automatic mutations' detections (advanced)
  debounceDelay: 50,
  // the delay on debounce used while resizing window (advanced)
  throttleDelay: 99,
  // the delay on throttle used while scrolling the page (advanced)
  // Settings that can be overridden on per-element basis, by `data-aos-*` attributes:
  offset: 120,
  // offset (in px) from the original trigger point
  delay: 0,
  // values from 0 to 3000, with step 50ms
  duration: 400,
  // values from 0 to 3000, with step 50ms
  easing: "ease",
  // default easing for AOS animations
  once: false,
  // whether animation should happen only once - while scrolling down
  mirror: true,
  // whether elements should animate out while scrolling past them
  anchorPlacement: "top-bottom" // defines which position of the element regarding to window should trigger the animation

});
var swiper = new Swiper(".swiper-container", {
  pagination: ".swiper-pagination",
  slidesPerView: "auto",
  spaceBetween: 16,
  paginationClickable: false,
  freeMode: true,
  autoplay: {
    delay: 5000
  }
});
var mySwiper = new Swiper(".mySwiper", {
  slidesPerView: "auto",
  spaceBetween: 16,
  slidesPerGroup: 4,
  loop: true,
  loopFillGroupWithBlank: true,
  freeMode: true,
  pagination: {
    el: ".swiper-pagination",
    clickable: true
  },
  navigation: {
    nextEl: ".swiper-button-next",
    prevEl: ".swiper-button-prev"
  }
}); //url checker

var urlLocation = window.location.href.split("/");
var fileName = urlLocation[urlLocation.length - 1]; //Api data Array

var userData = []; //搜尋結果Array

var filteredData = []; //購物車 Array

var cartData = [];
"use strict";
"use strict";

function _toConsumableArray(arr) { return _arrayWithoutHoles(arr) || _iterableToArray(arr) || _unsupportedIterableToArray(arr) || _nonIterableSpread(); }

function _nonIterableSpread() { throw new TypeError("Invalid attempt to spread non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method."); }

function _unsupportedIterableToArray(o, minLen) { if (!o) return; if (typeof o === "string") return _arrayLikeToArray(o, minLen); var n = Object.prototype.toString.call(o).slice(8, -1); if (n === "Object" && o.constructor) n = o.constructor.name; if (n === "Map" || n === "Set") return Array.from(o); if (n === "Arguments" || /^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(n)) return _arrayLikeToArray(o, minLen); }

function _iterableToArray(iter) { if (typeof Symbol !== "undefined" && iter[Symbol.iterator] != null || iter["@@iterator"] != null) return Array.from(iter); }

function _arrayWithoutHoles(arr) { if (Array.isArray(arr)) return _arrayLikeToArray(arr); }

function _arrayLikeToArray(arr, len) { if (len == null || len > arr.length) len = arr.length; for (var i = 0, arr2 = new Array(len); i < len; i++) { arr2[i] = arr[i]; } return arr2; }

if (fileName.toLowerCase().includes("search")) {
  //建立課程HTML
  var renderCourseList = function renderCourseList(data, className) {
    var html = ""; //確認是slider樣式還是一般卡片樣式

    var styleSwitch = filteredData.length ? "col-md-4 mb-24" : "swiper-slide";
    data.forEach(function (item) {
      html += "\n            <div class=\"".concat(styleSwitch, "\">\n            <div class=\"course-card bg-light text-black rounded-2 me-16\">\n              <div class=\"course-head\">\n                <img\n                  class=\"object-cover rounded-top justify-content-center img-fluid\"\n                  src=\"").concat(item.course.img, "\"\n                  alt=\"player-guitar\"\n                />\n                <div class=\"d-flex justify-content-center mt-8\">\n                  <p class=\"course-name\">").concat(item.course.name, "</p>\n                </div>\n              </div>\n              <div class=\"course-body d-flex gap-8 px-16 justify-content-center\">\n                <div class=\"text-center\">\n                  <p>\u5B78\u751F\u4EBA\u6578</p>\n                  <p class=\"course-student\">").concat(item.course.studentNumber, "</p>\n                </div>\n                <div class=\"text-center\">\n                  <p>\u8AB2\u7A0B\u5206\u6578</p>\n                  <p class=\"course-score\">").concat(item.course.rating, "</p>\n                </div>\n                <div class=\"text-center\">\n                  <p>\u8AB2\u7A0B\u7E3D\u6642\u6578</p>\n                  <p class=\"course-time\">").concat(item.course.courseHours, "</p>\n                </div>\n              </div>\n              <div class=\"course-footer px-16 pb-16\">\n                <div class=\"d-flex justify-content-center fs-5\">\n                  <p class=\"mb-0\">\u5B9A\u50F9\uFF1A</p>\n                  <p class=\"course-price pe-8 mb-0\">").concat(item.course.discountPrice, "</p>\n                  <p\n                    class=\"course-discountPrice text-decoration-line-through mb-0 text-info\"\n                  >\n                    ").concat(item.course.price, "\n                  </p>\n                </div>\n                <div class=\"d-flex justify-content-around  mt-8 btn-course\">\n                  <button class=\"btn btn-primary btn-cart\" data-id=\"").concat(item.id, "\">\n                    \u52A0\u5165\u8CFC\u7269\u8ECA\n                  </button>\n                  <button class=\"btn btn-primary btn-more\" data-id=\"").concat(item.id, "\" data-bs-toggle=\"modal\" data-bs-target=\"#exampleModal\">\n                    More\n                  </button>\n                </div>\n              </div>\n            </div>\n          </div>\n");
    });
    className.innerHTML = html;
  };

  var addCart = function addCart(id) {
    var cartItme = userData.find(function (item) {
      return item.id === id;
    });

    if (cartData.some(function (cart) {
      return cart.id === id;
    })) {
      return alert("此項目已在購物車內");
    }

    cartData.push(cartItme);
    localStorage.setItem("cart", JSON.stringify(cartData));
  }; //購物車功能(未完成) localhost


  //搜尋功能(click, keydown)
  var searchkeyWord = function searchkeyWord() {
    //暫時需要使用者選擇收尋項目
    if (formSelect.value === "0") return alert("請選擇搜索項目"); //阻止輸入空字串

    if (fakeSearch.value === "" || fakeSearch.length === 0) return alert("請輸入有效關鍵字"); //如果filteredData已經有東西,則清除

    if (filteredData.length > 0) filteredData = []; //將初始搜尋畫面

    courseSearch.innerHTML = "";
    noSearchRow.classList.add("d-none");
    searchRow.classList.remove("d-none"); //確認目前選擇搜尋項目
    //比對搜尋結果

    var searchResult = fakeSearch.value.trim().toLowerCase();
    var selectNumber = formSelect.value; //搜尋課程

    if (selectNumber === "1") {
      filteredData = userData.filter(function (item) {
        return item.course.name.toLowerCase().includes(searchResult);
      });
    } //搜尋文章(json未建置)


    if (selectNumber === "2") {
      filteredData = userData.filter(function (item) {
        return item.article.name.toLowerCase().includes(searchResult);
      });
    } //搜尋吉他譜(json未建置)


    if (selectNumber === "3") {
      filteredData = userData.filter(function (item) {
        return item.tab.name.toLowerCase().includes(searchResult);
      });
    }

    searchTitle.innerHTML = "\u76EE\u524D\u641C\u5C0B\u7D50\u679C\u6578\u91CF: ".concat(filteredData.length);

    if (filteredData.length) {
      renderCourseList(filteredData, courseSearch);
    } else {
      renderCourseList(userData, courseList);
    }

    fakeSearch.value = "";
  }; //搜尋功能(未完成)


  var BASE_URL = "https://s339428326.github.io";
  var VER_URL = BASE_URL + "/FakeApi";
  var POSTRE_URL = VER_URL + "/MOCK_DATA.json";
  var body = document.querySelector("body"); //search bar

  var fakeSearch = document.querySelector(".fake-search");
  var formSelect = document.querySelector(".form-select");
  var searchBtn = document.querySelector(".search-btn"); //search list

  var courseList = document.querySelector(".course-list"); // value 1

  var articleList = document.querySelector(".article-list"); //value 2

  var tabList = document.querySelector(".tab-list"); //value 3
  //search-content

  var courseSearch = document.querySelector(".course-search"); //no-search-row

  var noSearchRow = document.querySelector(".no-search-page");
  var searchRow = document.querySelector(".search-page"); //research btn

  var searchTitle = document.querySelector(".search-title");
  var researchBtn = document.querySelector(".btn-research");
  body.addEventListener("click", function (e) {
    var targetNumber = Number(e.target.dataset.id);

    if (e.target.matches(".btn-cart")) {
      addCart(targetNumber);
    } else if (e.target.matches(".btn-more")) {
      console.log("bs-5 modal");
    }
  });
  searchBtn.addEventListener("click", function (e) {
    e.preventDefault();
    searchkeyWord();
  });
  fakeSearch.addEventListener("keydown", function (e) {
    if (e.key === "Enter") {
      e.preventDefault();
      searchkeyWord();
    }
  });
  researchBtn.addEventListener("click", function (e) {
    console.log("click");
    noSearchRow.classList.remove("d-none");
    searchRow.classList.add("d-none");
  }); //axios讀取json檔案並放入userData

  axios.get(POSTRE_URL).then(function (response) {
    var _userData;

    (_userData = userData).push.apply(_userData, _toConsumableArray(response.data));

    console.log(userData, "api get data");
    renderCourseList(userData, courseList);
  })["catch"](function (error) {
    {
      console.log(error);
    }
  });
}
//# sourceMappingURL=all.js.map
