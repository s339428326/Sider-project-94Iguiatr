"use strict";

function _createForOfIteratorHelper(o, allowArrayLike) { var it = typeof Symbol !== "undefined" && o[Symbol.iterator] || o["@@iterator"]; if (!it) { if (Array.isArray(o) || (it = _unsupportedIterableToArray(o)) || allowArrayLike && o && typeof o.length === "number") { if (it) o = it; var i = 0; var F = function F() {}; return { s: F, n: function n() { if (i >= o.length) return { done: true }; return { done: false, value: o[i++] }; }, e: function e(_e) { throw _e; }, f: F }; } throw new TypeError("Invalid attempt to iterate non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method."); } var normalCompletion = true, didErr = false, err; return { s: function s() { it = it.call(o); }, n: function n() { var step = it.next(); normalCompletion = step.done; return step; }, e: function e(_e2) { didErr = true; err = _e2; }, f: function f() { try { if (!normalCompletion && it["return"] != null) it["return"](); } finally { if (didErr) throw err; } } }; }

function _unsupportedIterableToArray(o, minLen) { if (!o) return; if (typeof o === "string") return _arrayLikeToArray(o, minLen); var n = Object.prototype.toString.call(o).slice(8, -1); if (n === "Object" && o.constructor) n = o.constructor.name; if (n === "Map" || n === "Set") return Array.from(o); if (n === "Arguments" || /^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(n)) return _arrayLikeToArray(o, minLen); }

function _arrayLikeToArray(arr, len) { if (len == null || len > arr.length) len = arr.length; for (var i = 0, arr2 = new Array(len); i < len; i++) { arr2[i] = arr[i]; } return arr2; }

/////////////////plug setting//////////////////
//AOS
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
  offset: 50,
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

}); //Swiper

var swiper = new Swiper(".swiper-container", {
  pagination: ".swiper-pagination",
  slidesPerView: "auto",
  // slidesPerView: 3,
  spaceBetween: 16,
  paginationClickable: false,
  freeMode: true
});
var swiper = new Swiper(".swiper-course", {
  slidesPerView: 1,
  spaceBetween: 9,
  paginationClickable: false,
  freeMode: false,
  breakpoints: {
    640: {
      slidesPerView: 3,
      spaceBetween: 16
    }
  }
}); /////////////////////////////////////////////
//url checker

var urlLocation = window.location.href.split("/");
var fileName = urlLocation[urlLocation.length - 1];
console.log(urlLocation, fileName); //Api data

var userData = []; //搜尋結果

var filteredData = []; //購物車

var cartData = []; //已購買商品

var myItemList = [];
var priceTotal = 0;
var body = document.querySelector("body");
var cartModal = document.querySelector(".cart-modal");
var cartPriceTotal = document.querySelector(".cart-price-total");
var cartCounter = document.querySelector(".cart-counter");
var buyCheck = document.querySelector(".buy-check");
var btnCartModal = document.querySelector(".btn-cart-modal"); //登入

var navLogin = document.querySelector(".nav-login");
var dropdownAccount = document.querySelector(".dropdown-account");
var btnLoginOut = document.querySelector(".btn-login-out"); //取得本地購物車內容

getloaclCart(); //取得購買課程資訊

getmyItemList();

function getmyItemList() {
  if (JSON.parse(localStorage.getItem("course")) !== null) {
    myItemList = JSON.parse(localStorage.getItem("course"));
  } else {
    myItemList = [];
  }

  console.log(myItemList);
}

function getloaclCart() {
  var cartlist;

  if (JSON.parse(localStorage.getItem("cart")) !== null) {
    cartlist = JSON.parse(localStorage.getItem("cart"));
  } else {
    cartlist = [];
  }

  if (cartlist.length) {
    cartData = cartlist;
    cartModal.innerHTML = "";
    cartCounter.classList.remove("d-none");
    cartCounter.innerHTML = "".concat(cartData.length);
    cartData.forEach(function (item) {
      //updata price
      priceTotal += priceStringToNumber(item.course.discountPrice);
      creatCartHTML(item);
    }); //updata price HTML

    cartPriceTotal.innerHTML = "\u7E3D\u91D1\u984D\uFF1A".concat(priceTotal, " NTD");
  } else {
    cartData = [];
    cartModal.innerHTML = "\n    <div class = \"py-104 d-flex flex-column justify-content-center\">\n      <p class=\"text-info text-center fs-5 mb-16\">\u76EE\u524D\u6C92\u6709\u4EFB\u4F55\u5546\u54C1</p>\n      <a class=\"btn btn-primary text-white w-50 mx-auto\" href=\"./search.html\">\u9EDE\u64CA\uFF01\u524D\u5F80\u8CFC\u8CB7\u9801\u9762</a>\n    </div>\n    ";
  }
} //價格格式整理


function priceStringToNumber(string) {
  var newWord = "";

  var _iterator = _createForOfIteratorHelper(string),
      _step;

  try {
    for (_iterator.s(); !(_step = _iterator.n()).done;) {
      var word = _step.value;

      if (word === "$" || word === ",") {
        newWord += "";
      } else {
        newWord += word;
      }
    }
  } catch (err) {
    _iterator.e(err);
  } finally {
    _iterator.f();
  }

  return Number(newWord);
}

function creatCartHTML(item) {
  cartModal.innerHTML += "\n<div class=\"d-flex  justify-content-around p-16 border border-primary shadow-lg rounded-2\">\n  <img class=\"object-cover\" src=\"".concat(item.course.img, "\" alt=\"\" width=\"125\" height=\"125\">\n  <div>\n    <p>\u8AB2\u7A0B\uFF1A").concat(item.course.name, "</p>\n    <div class=\"d-flex gap-8 \">\n      <p>\u50F9\u683C\uFF1A</p>\n      <p>").concat(item.course.discountPrice, "</p>\n      <p class=\"text-info text-decoration-line-through \">").concat(item.course.price, "</p>\n      <div class=\"d-flex\">\n        <button class=\"btn btn-danger\" data-id = \"").concat(item.id, "\">\u522A\u9664</button>\n      </div>\n    </div>\n  </div>\n</div>\n  ");
} //加入購物車功能


function addCart(id) {
  var cartItme = userData.find(function (item) {
    return item.id === id;
  });

  if (cartData.some(function (cart) {
    return cart.id === id;
  })) {
    return alert("此項目已在購物車內");
  }

  if (myItemList.some(function (item) {
    return item.id === id;
  })) {
    return alert("此項目購買請查看 追蹤 & 收藏");
  }

  cartData.push(cartItme);
  localStorage.setItem("cart", JSON.stringify(cartData)); //updata price

  priceTotal += priceStringToNumber(cartItme.course.discountPrice);
  cartPriceTotal.innerHTML = "\u7E3D\u91D1\u984D\uFF1A".concat(priceTotal, " NTD"); //updata HTML

  if (cartData.length === 1) {
    cartModal.innerHTML = "";
  }

  cartCounter.classList.remove("d-none");
  cartCounter.innerHTML = "".concat(cartData.length);
  creatCartHTML(cartItme);
} //刪除購物車項目


function deletCart(id) {
  //find index
  var cartIndex = cartData.findIndex(function (item) {
    return item.id === id;
  });
  console.log(cartIndex); //update price

  var cartItme = cartData.find(function (item) {
    return item.id === id;
  });
  priceTotal -= priceStringToNumber(cartItme.course.discountPrice);
  cartPriceTotal.innerHTML = "\u7E3D\u91D1\u984D\uFF1A".concat(priceTotal, " NTD"); //Delet item and item localStorage

  cartData.splice(cartIndex, 1);
  localStorage.setItem("cart", JSON.stringify(cartData));

  if (cartData.length) {
    cartModal.innerHTML = "";
    cartData.forEach(function (item) {
      creatCartHTML(item);
    });
    cartCounter.innerHTML = "".concat(cartData.length);
    buyCheck.classList.remove("disabled");
  } else {
    cartCounter.classList.add("d-none");
    cartModal.innerHTML = "\n    <div class = \"py-104 d-flex flex-column justify-content-center\">\n      <p class=\"text-info text-center fs-5 mb-16\">\u76EE\u524D\u6C92\u6709\u4EFB\u4F55\u5546\u54C1</p>\n      <a class=\"btn btn-primary text-white w-50 mx-auto\" href=\"./search.html\">\u9EDE\u64CA\uFF01\u524D\u5F80\u8CFC\u8CB7\u9801\u9762</a>\n    </div>\n    ";
    buyCheck.classList.add("disabled");
  }
} //課程彈跳視窗


function courseModal(id) {
  var item = userData.find(function (item) {
    return item.id === id;
  });
  modalContent.innerHTML = "\n    <div class=\"modal-header border-0 p-4\">\n    <img\n      class=\"object-cover img-fuild w-100\"\n      src=\" ".concat(item.course.img, "\"\n      alt=\"\"\n    />\n  </div>\n  <div class=\"modal-body text-black\">\n    <h5 class=\"modal-title mb-8\" id=\"exampleModalLabel\">\n      ").concat(item.course.name, "\n    </h5>\n\n    <div\n      class=\"d-flex justify-content-around my-16 flex-column flex-md-row justify-content-center align-items-center\"\n    >\n      <img\n        class=\"rounded-circle\"\n        src=\"").concat(item.avatar, "\"\n        alt=\"\"\n        width=\"128\"\n        height=\"128\"\n      />\n      <div class=\"list-unstyled\">\n        <div>\n          <p class=\"text-center text-md-start\">\n            \u8B1B\u5E2B\uFF1A<a href=\"./imagePage.html\"\n              >").concat(item.last_name + " " + item.first_name, "</a\n            >\n          </p>\n          <ul\n            class=\"list-unstyled bg-primary d-flex rounded-3 p-8 gap-4 justify-content-around\"\n          >\n            <li>\n              <a href=\"#\">\n                <img\n                  src=\"./assets/images/instagram.png\"\n                  alt=\"\"\n                  width=\"25\"\n                  height=\"25\"\n              /></a>\n            </li>\n            <li>\n              <a href=\"#\">\n                <img\n                  src=\"./assets/images/facebook.png\"\n                  alt=\"\"\n                  width=\"25\"\n                  height=\"25\"\n                />\n              </a>\n            </li>\n            <li>\n              <a href=\"#\">\n                <img\n                  src=\"./assets/images/youtube.png\"\n                  alt=\"\"\n                  width=\"25\"\n                  height=\"25\"\n                />\n              </a>\n            </li>\n          </ul>\n        </div>\n\n        <div class=\"d-flex gap-8\">\n          <ul class=\"list-unstyled\">\n            <li>\u6559\u5B78\u7D93\u6B77\uFF1A</li>\n            <li>item</li>\n            <li>item</li>\n            <li>item</li>\n          </ul>\n          <ul class=\"list-unstyled\">\n            <li>\u53C3\u8CFD\u7D93\u9A57\uFF1A</li>\n            <li>item</li>\n            <li>item</li>\n            <li>item</li>\n          </ul>\n        </div>\n      </div>\n      <div></div>\n    </div>\n    <div class=\"row border text-center mb-32\">\n      <div class=\"col-4 border-end\">\n        <p>\u5B78\u751F\u4EBA\u6578</p>\n        <p class=\"mb-0\">").concat(item.course.studentNumber, "</p>\n      </div>\n      <div class=\"col-4 border-end\">\n        <p>\u8AB2\u7A0B\u5206\u6578</p>\n        <p class=\"course-score mb-0\">").concat(item.course.rating, "</p>\n      </div>\n      <div class=\"col-4\">\n        <p>\u8AB2\u7A0B\u7E3D\u6642\u6578</p>\n        <p class=\"course-time mb-0\">").concat(item.course.courseHours, "</p>\n      </div>\n    </div>\n\n    <div class=\"d-flex justify-content-around\">\n      <div>\n        <h5>\u8AB2\u7A0B\u5167\u5BB9\uFF1A</h5>\n        <ul>\n          <li>item1</li>\n          <li>item2</li>\n          <li>item3</li>\n          <li>item4</li>\n        </ul>\n      </div>\n\n      <div>\n        <h5 class=\"fw-bold\">\u6B64\u8AB2\u7A0B\u6B0A\u76CA\uFF1A</h5>\n        <ul class=\"list-unstyled\">\n          <li>30 \u5929\u9000\u6B3E\u4FDD\u8B49</li>\n          <li>\u900F\u904E\u88DD\u7F6E\u8207\u96FB\u8996\u5B58\u53D6</li>\n          <li>\u5B8C\u6574\u7D42\u8EAB\u5B58\u53D6\u6B0A</li>\n          <li>\u7D50\u696D\u8B49\u66F8</li>\n        </ul>\n      </div>\n    </div>\n    <ul class=\"d-flex gap-16 list-unstyled justify-content-center\">\n      <li><a href=\"#\">\u5206\u4EAB</a></li>\n      <li><a href=\"#\">\u5C07\u6B64\u8AB2\u7A0B\u8D08\u9001</a></li>\n      <li><a href=\"#\">\u5957\u7528\u512A\u60E0\u5377</a></li>\n    </ul>\n  </div>\n  <div class=\"modal-footer\">\n    <div class=\"d-flex gap-8\">\n      <p class=\"fs-5 text-black\">\u5B9A\u50F9\uFF1A").concat(item.course.discountPrice, "</p>\n      <p\n        class=\"course-discountPrice text-decoration-line-through text-info mt-auto\"\n      >\n        ").concat(item.course.price, "\n      </p>\n    </div>\n    <button\n      class=\"btn btn-primary w-100 text-white btn-cart mb-8\"\n      data-id=\"").concat(item.id, "\"\n    >\n      \u65B0\u589E\u81F3\u8CFC\u7269\u8ECA\n    </button>\n    <button\n      type=\"button\"\n      class=\"btn btn-secondary w-100\"\n      data-bs-dismiss=\"modal\"\n    >\n      Close\n    </button>\n  </div>\n      ");
} //確認點擊購物車或者是more btn


body.addEventListener("click", function (e) {
  var targetNumber = Number(e.target.dataset.id);

  if (e.target.matches(".btn-cart")) {
    addCart(targetNumber);
  }

  if (e.target.matches(".btn-more")) {
    courseModal(targetNumber);
  }

  if (e.target.matches(".btn-danger")) {
    deletCart(targetNumber); //更新buy.html

    if (fileName.toLowerCase().includes("buy")) {
      updataBuyPrice(priceTotal);
      buyListCreatHTML(cartData);
    }
  }
});
buyCheck.addEventListener("click", function (e) {
  if (!cartData.length) {
    e.preventDefault();
    return alert("購物車內目前無商品");
  }
});
btnCartModal.addEventListener("click", function (e) {
  if (!cartData.length) {
    buyCheck.classList.add("disabled");
  } else {
    buyCheck.classList.remove("disabled");
  }
});
btnLoginOut.addEventListener("click", function (e) {
  localStorage.setItem("login", false);
});

if (localStorage.getItem("login") === "true") {
  dropdownAccount.classList.remove("d-none");
  navLogin.classList.add("d-none");
}

if (localStorage.getItem("login") === "false") {
  dropdownAccount.classList.add("d-none");
  navLogin.classList.remove("d-none");
}
"use strict";

if (fileName.toLowerCase().includes("buy")) {
  var buyListCreatHTML = function buyListCreatHTML(data) {
    var html = "";
    cartData.forEach(function (item) {
      html += "\n      <li class=\"rounded-2 shadow p-4 border border-primary\">\n      <div class=\"d-flex gap-16 flex-column flex-lg-row\">\n        <div class=\"coursr-image my-auto\">\n          <img\n            class=\"object-cover img-fuild rounded\"\n            src=\"".concat(item.course.img, "\"\n            alt=\"\"\n            width=\"124\"\n            height=\"124\"\n          />\n        </div>\n        <div>\n          <ul\n            class=\"list-unstyled h-100 d-flex flex-column justify-content-around\"\n          >\n            <li>\u8AB2\u7A0B\uFF1A").concat(item.course.name, "</li>\n            <li>\u8B1B\u5E2B\uFF1A").concat(item.first_name + " " + item.last_name, "</li>\n            <li>\u8AB2\u7A0B\u7E3D\u6642\u6578\uFF1A").concat(item.course.courseHours, "</li>\n            <li>\n              <div class=\"d-flex gap-8\">\n                <p class=\"fs-5 mb-0\">\u50F9\u683C\uFF1A").concat(item.course.discountPrice, "</p>\n                <p\n                  class=\"mb-0 text-decoration-line-through text-info mt-auto\"\n                >\n                ").concat(item.course.price, "\n                </p>\n              </div>\n            </li>\n          </ul>\n        </div>\n        <button class=\"btn btn-danger ms-lg-auto rounded-end\" data-id = \"").concat(item.id, "\">\u522A\u9664</button>\n      </div>\n    </li>\n      ");
    });
    buyList.innerHTML = html;

    if (!cartData.length) {
      buyList.innerHTML = "\n        <div class = \"py-104 d-flex flex-column justify-content-center\">\n            <p class=\"text-info text-center fs-5 mb-16\">\u76EE\u524D\u6C92\u6709\u4EFB\u4F55\u5546\u54C1</p>\n            <a class=\"btn btn-primary text-white w-50 mx-auto\" href=\"./search.html\">\u9EDE\u64CA\uFF01\u524D\u5F80\u8CFC\u8CB7\u9801\u9762</a>\n        </div>\n        ";
      buyNext.classList.add("disabled");
    } else {
      buyNext.classList.remove("disabled");
    }
  }; //更新總額


  var updataBuyPrice = function updataBuyPrice(price) {
    buyPriceList.innerHTML = "\n    <li class=\"d-flex justify-content-between\">\n        <p class=\"mb-0\">\u5C0F\u8A08</p>\n        <p class=\"mb-0\">$ ".concat(price, " NTD</p>\n    </li>\n    <li class=\"d-flex justify-content-between\">\n        <p class=\"mb-0\">\u4ECA\u65E5\u7BC0\u7701\u7E3D\u91D1\u984D</p>\n        <p class=\"mb-0\">$ 0 NTD</p>\n    </li>\n    <li li class=\"d-flex justify-content-between\">\n        <p class=\"mb-0\">\u904B\u9001 (\u570B\u969B\u512A\u5148)</p>\n        <p class=\"mb-0\">$ 0 NTD</p>\n    </li>\n    <li class=\"d-flex justify-content-between\">\n        <p class=\"mb-0\">\u7A05\u6B3E</p>\n        <p class=\"mb-0\">$ 0 NTD</p>\n    </li>\n    ");
    buyPriceTotal.innerHTML = "$ ".concat(price, " NTD");
  };

  var buyList = document.querySelector(".buy-list");
  var buyPriceList = document.querySelector(".buy-price");
  var buyPriceTotal = document.querySelector(".buy-price-total");
  var buyNext = document.querySelector(".buy-next");
  buyListCreatHTML(cartData);
  updataBuyPrice(priceTotal);
  buyNext.addEventListener("click", function (e) {
    confirmPurchase = true;
  });
}
"use strict";

if (fileName.toLowerCase().includes("login")) {
  var btnLogin = document.querySelector(".btn-login");
  btnLogin.addEventListener("click", function (e) {
    localStorage.setItem("login", true);
    dropdownAccount.classList.remove(".d-none");
    navLogin.classList.add(".d-none");
  });
}
"use strict";

if (fileName.toLowerCase().includes("member")) {
  var drawChartFollow = function drawChartFollow() {
    var data = google.visualization.arrayToDataTable([["年齡族群", "數量"], ["0~15歲", 20], ["16~23歲", 120], ["24~35歲", 90], ["36~45歲", 25], ["46~55歲", 10], ["55~65歲", 5], ["65以上", 3]]);
    var options = {
      title: "追蹤族群",
      pieHole: 0.4,
      width: 400,
      height: 400,
      backgroundColor: "transparent",
      titleTextStyle: {
        color: "white",
        fontSize: 36,
        bold: true
      },
      chartArea: {
        left: 20,
        // top: -10,
        width: "100%",
        height: "75%"
      },
      legend: {
        textStyle: {
          color: "white",
          fontSize: 16
        }
      }
    };
    var chart = new google.visualization.PieChart(document.getElementById("follow-groups"));
    chart.draw(data, options);
  };

  var drawChartCommodity = function drawChartCommodity() {
    var data = google.visualization.arrayToDataTable([["商品種類", "數量"], ["數位商品", 150], ["實體商品", 20], ["其他", 10]]);
    var options = {
      title: "上架收益佔比",
      pieHole: 0.4,
      width: 400,
      height: 400,
      backgroundColor: "transparent",
      titleTextStyle: {
        color: "white",
        fontSize: 36,
        bold: true
      },
      chartArea: {
        left: 20,
        // top: -10,
        width: "100%",
        height: "75%"
      },
      legend: {
        textStyle: {
          color: "white",
          fontSize: 16
        }
      }
    };
    var chart = new google.visualization.PieChart(document.getElementById("commodity"));
    chart.draw(data, options);
  };

  var drawStacked = function drawStacked() {
    var data = google.visualization.arrayToDataTable([["月份", "NTD"], ["1月", 2000], ["2月", 3000], ["3月", 10000], ["4月", 3000], ["5月", 10000], ["6月", 12000], ["7月", 20000], ["8月", 5000], ["9月", 8000], ["10月", 9000], ["11月", 12000], ["12月", 21000]]);
    var options = {
      title: "收益",
      chartArea: {
        width: "50%"
      },
      isStacked: true,
      width: 400,
      height: 400,
      backgroundColor: "transparent",
      legend: {
        textStyle: {
          color: "white",
          fontSize: 16
        }
      },
      titleTextStyle: {
        color: "white",
        fontSize: 36,
        bold: true
      },
      hAxis: {
        title: "總收益",
        minValue: 0,
        titleTextStyle: {
          color: "white",
          fontSize: 16,
          bold: true
        }
      },
      vAxis: {
        title: "月份",
        titleTextStyle: {
          color: "white",
          fontSize: 16,
          bold: true
        }
      }
    };
    var chart = new google.visualization.BarChart(document.getElementById("chart_price"));
    chart.draw(data, options);
  };

  //   google.charts.load("current", { packages: ["corechart"] });
  google.charts.load("current", {
    packages: ["corechart", "bar"]
  });
  google.charts.setOnLoadCallback(drawChartFollow);
  google.charts.setOnLoadCallback(drawChartCommodity);
  google.charts.setOnLoadCallback(drawStacked);
}
"use strict";

if (fileName.toLowerCase().includes("payment")) {
  var paymentTotal = document.querySelector(".payment-total");
  var btnPayment = document.querySelector(".btn-payment");
  paymentTotal.innerHTML = "$ ".concat(priceTotal, " NTD");
  btnCartModal.dataset.bsTarget = "";
  btnPayment.addEventListener("click", function (e) {
    if (myItemList.length > 0) {
      var newItem = cartData;
      var oldMyItem = JSON.parse(localStorage.getItem("course"));
      newItem = oldMyItem.concat(newItem);
      localStorage.setItem("course", JSON.stringify(newItem));
      localStorage.setItem("cart", JSON.stringify([]));
    } else {
      localStorage.setItem("course", JSON.stringify(cartData));
      localStorage.setItem("cart", JSON.stringify([]));
    }

    cartData = [];
  });
}
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
      html += "\n            <div class=\"".concat(styleSwitch, "\">\n            <div class=\"course-card bg-light text-black rounded-2 me-md-16\">\n              <div class=\"course-head\">\n                <img\n                  class=\"object-cover rounded-top justify-content-center img-fluid w-100\"\n                  src=\"").concat(item.course.img, "\"\n                  alt=\"player-guitar\"\n                />\n                <div class=\"d-flex justify-content-center my-8\">\n                  <p class=\"course-name mb-0 fw-bold\">").concat(item.course.name, "</p>\n                </div>\n              </div>\n              <div class=\"course-footer rounded-bottom\">\n                <div class=\"d-flex justify-content-center border-top border-bottom py-8\">\n                  <p class=\"course-price pe-8 mb-0 text-danger fw-bold\">\u8D85\u503C\u50F9\u683C\uFF1A").concat(item.course.discountPrice, "</p>\n                  <p\n                    class=\"course-discountPrice text-decoration-line-through mb-0 text-info\"\n                  >\n                    ").concat(item.course.price, "\n                  </p>\n                </div>\n                <div class=\"d-flex btn-course bg-primary rounded-bottom\">\n                  <div class=\"btn btn-cart py-8 border-end rounded-0 w-50\" data-id=\"").concat(item.id, "\">\n                    \u52A0\u5165\u8CFC\u7269\u8ECA\n                  </div>\n                  <div class=\"btn btn-more py-8 rounded-0 w-50\" data-id=\"").concat(item.id, "\" data-bs-toggle=\"modal\" data-bs-target=\"#exampleModal\">\n                    More\n                  </div>\n                </div>\n              </div>\n            </div>\n          </div>\n");
    });
    className.innerHTML = html;
  }; //搜尋功能


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
    } else {}

    fakeSearch.value = "";
  };

  var BASE_URL = "https://s339428326.github.io";
  var VER_URL = BASE_URL + "/FakeApi";
  var POSTRE_URL = VER_URL + "/MOCK_DATA.json"; //search bar

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
  var researchBtn = document.querySelector(".btn-research"); //bs5 modal

  var modalContent = document.querySelector(".modal-content");
  searchBtn.addEventListener("click", function (e) {
    e.preventDefault();
    searchkeyWord();
  });
  fakeSearch.addEventListener("keydown", function (e) {
    if (e.key === "Enter") {
      e.preventDefault();
      searchkeyWord();
    }
  }); //重新搜索按鈕

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
"use strict";

if (fileName.toLowerCase().includes("track")) {
  //購買課程
  var renderCourseItem = function renderCourseItem() {
    courseItemList.innerHTML = "";
    myItemList.forEach(function (item) {
      courseItemList.innerHTML += "\n      <div class=\"col-md-4 mb-24\">\n                    <div class=\"card h-100\">\n                      <img src=\"".concat(item.course.img, "\" class=\"card-img-top object-cover\" alt=\"...\" height=\"175\">\n                      <div class=\"card-body\">\n                        <p class=\"card-title\">").concat(item.course.name, "</p>\n                        <div class=\"progress\">\n                          <div class=\"progress-bar\" role=\"progressbar\" style=\"width: 0%\" aria-valuenow=\"0\"aria-valuemin=\"0\" aria-valuemax=\"100\"></div>\n                    </div>\n                    <div class=\"d-flex justify-content-between mt-16\">\n                        <p class=\"mb-0\">0% \u5B8C\u6210</p>\n                        <p class=\"mb-0\">\u4F5C\u8005\uFF1A").concat(item.first_name + " " + item.last_name, "</p>\n                    </div>\n            </div>\n        </div>\n    </div>\n      ");
    });
  };

  var courseItemList = document.querySelector(".course-item-list");
  console.log(courseItemList);
  renderCourseItem();
}
//# sourceMappingURL=all.js.map
