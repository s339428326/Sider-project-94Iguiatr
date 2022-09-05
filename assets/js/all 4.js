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
  freeMode: true
});
var mySwiper = new Swiper(".mySwiper", {
  slidesPerView: "auto",
  spaceBetween: 16,
  slidesPerGroup: 4,
  // loop: true,
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
var fileName = urlLocation[urlLocation.length - 1];
"use strict";
"use strict";

function _toConsumableArray(arr) { return _arrayWithoutHoles(arr) || _iterableToArray(arr) || _unsupportedIterableToArray(arr) || _nonIterableSpread(); }

function _nonIterableSpread() { throw new TypeError("Invalid attempt to spread non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method."); }

function _unsupportedIterableToArray(o, minLen) { if (!o) return; if (typeof o === "string") return _arrayLikeToArray(o, minLen); var n = Object.prototype.toString.call(o).slice(8, -1); if (n === "Object" && o.constructor) n = o.constructor.name; if (n === "Map" || n === "Set") return Array.from(o); if (n === "Arguments" || /^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(n)) return _arrayLikeToArray(o, minLen); }

function _iterableToArray(iter) { if (typeof Symbol !== "undefined" && iter[Symbol.iterator] != null || iter["@@iterator"] != null) return Array.from(iter); }

function _arrayWithoutHoles(arr) { if (Array.isArray(arr)) return _arrayLikeToArray(arr); }

function _arrayLikeToArray(arr, len) { if (len == null || len > arr.length) len = arr.length; for (var i = 0, arr2 = new Array(len); i < len; i++) { arr2[i] = arr[i]; } return arr2; }

if (fileName.toLowerCase().includes("search")) {
  var renderCourseList = function renderCourseList() {
    var html = "";
    var coursList = document.querySelector(".course-list");
    userData.forEach(function (item) {
      console.log(item);
    });
  };

  var BASE_URL = "https://randomuser.me/api";
  var VER_URL = BASE_URL + "/1.4";
  var resultCount = "10";
  var POSTRE_URL = VER_URL + "/?results=" + resultCount;
  var userData = [];
  var searchBtn = document.querySelector(".search-btn");
  searchBtn.addEventListener("click", function (e) {
    e.preventDefault();
    var fakeSearch = document.querySelector(".fake-search");
    console.log(fakeSearch.value); //比對課程名稱

    fakeSearch.value = "";
  });
  axios.get(POSTRE_URL).then(function (response) {
    var data = response.data.results;
    userData.push.apply(userData, _toConsumableArray(data));
    renderCourseList();
    console.log(userData);
  })["catch"](function (error) {
    {
      console.log(error);
    }
  });
}
//# sourceMappingURL=all.js.map
