/////////////////plug setting//////////////////
//AOS
AOS.init({
  // Global settings:
  disable: false, // accepts following values: 'phone', 'tablet', 'mobile', boolean, expression or function
  startEvent: "DOMContentLoaded", // name of the event dispatched on the document, that AOS should initialize on
  initClassName: "aos-init", // class applied after initialization
  animatedClassName: "aos-animate", // class applied on animation
  useClassNames: false, // if true, will add content of `data-aos` as classes on scroll
  disableMutationObserver: false, // disables automatic mutations' detections (advanced)
  debounceDelay: 50, // the delay on debounce used while resizing window (advanced)
  throttleDelay: 99, // the delay on throttle used while scrolling the page (advanced)

  // Settings that can be overridden on per-element basis, by `data-aos-*` attributes:
  offset: 120, // offset (in px) from the original trigger point
  delay: 0, // values from 0 to 3000, with step 50ms
  duration: 400, // values from 0 to 3000, with step 50ms
  easing: "ease", // default easing for AOS animations
  once: false, // whether animation should happen only once - while scrolling down
  mirror: true, // whether elements should animate out while scrolling past them
  anchorPlacement: "top-bottom", // defines which position of the element regarding to window should trigger the animation
});
//Swiper
var swiper = new Swiper(".swiper-container", {
  pagination: ".swiper-pagination",
  slidesPerView: "auto",
  // slidesPerView: 3,
  spaceBetween: 16,
  paginationClickable: false,
  freeMode: true,
});

var swiper = new Swiper(".swiper-course", {
  slidesPerView: 1,
  spaceBetween: 9,
  paginationClickable: false,
  freeMode: false,
  breakpoints: {
    640: {
      slidesPerView: 3,
      spaceBetween: 16,
    },
  },
});

var mySwiper = new Swiper(".mySwiper", {
  slidesPerView: "auto",
  spaceBetween: 16,
  slidesPerGroup: 4,
  loopFillGroupWithBlank: true,
  freeMode: true,
  pagination: {
    el: ".swiper-pagination",
    clickable: true,
  },
  navigation: {
    nextEl: ".swiper-button-next",
    prevEl: ".swiper-button-prev",
  },
});
/////////////////////////////////////////////

//url checker
const urlLocation = window.location.href.split("/");
const fileName = urlLocation[urlLocation.length - 1];

//Api data
const userData = [];
//搜尋結果
let filteredData = [];
//購物車
let cartData = [];
//購買確認
let confirmPurchase = false;

let priceTotal = 0;
const body = document.querySelector("body");
const cartModal = document.querySelector(".cart-modal");
const cartPriceTotal = document.querySelector(".cart-price-total");
const cartCounter = document.querySelector(".cart-counter");
const buyCheck = document.querySelector(".buy-check");
const btnCartModal = document.querySelector(".btn-cart-modal");

//取得本地購物車內容
getloaclCart();

function getloaclCart() {
  let cartlist;
  if (JSON.parse(localStorage.getItem("cart")) !== null) {
    cartlist = JSON.parse(localStorage.getItem("cart"));
  } else {
    cartlist = [];
  }
  if (cartlist.length) {
    cartData = cartlist;
    cartModal.innerHTML = "";
    cartCounter.classList.remove("d-none");
    cartCounter.innerHTML = `${cartData.length}`;
    cartData.forEach((item) => {
      //updata price
      priceTotal += priceStringToNumber(item.course.discountPrice);
      creatCartHTML(item);
    });
    //updata price HTML
    cartPriceTotal.innerHTML = `總金額：${priceTotal} NTD`;
  } else {
    cartData = [];
    cartModal.innerHTML = `
    <div class = "py-104 d-flex flex-column justify-content-center">
      <p class="text-info text-center fs-5 mb-16">目前沒有任何商品</p>
      <a class="btn btn-primary text-white w-50 mx-auto" href="./search.html">點擊！前往購買頁面</a>
    </div>
    `;
  }
}

//價格格式整理
function priceStringToNumber(string) {
  let newWord = "";
  for (const word of string) {
    if (word === "$" || word === ",") {
      newWord += "";
    } else {
      newWord += word;
    }
  }
  return Number(newWord);
}

function creatCartHTML(item) {
  cartModal.innerHTML += `
<div class="d-flex  justify-content-around p-16 border border-primary shadow-lg rounded-2">
  <img class="object-cover" src="${item.course.img}" alt="" width="125" height="125">
  <div>
    <p>課程：${item.course.name}</p>
    <div class="d-flex gap-8 ">
      <p>價格：</p>
      <p>${item.course.discountPrice}</p>
      <p class="text-info text-decoration-line-through ">${item.course.price}</p>
      <div class="d-flex">
        <button class="btn btn-danger" data-id = "${item.id}">刪除</button>
      </div>
    </div>
  </div>
</div>
  `;
}

//加入購物車功能
function addCart(id) {
  const cartItme = userData.find((item) => item.id === id);
  if (cartData.some((cart) => cart.id === id)) {
    return alert("此項目已在購物車內");
  }

  cartData.push(cartItme);
  localStorage.setItem("cart", JSON.stringify(cartData));

  //updata price
  priceTotal += priceStringToNumber(cartItme.course.discountPrice);
  cartPriceTotal.innerHTML = `總金額：${priceTotal} NTD`;
  //updata HTML
  if (cartData.length === 1) {
    cartModal.innerHTML = "";
  }
  cartCounter.classList.remove("d-none");
  cartCounter.innerHTML = `${cartData.length}`;
  creatCartHTML(cartItme);
}

//刪除購物車項目
function deletCart(id) {
  //find index
  const cartIndex = cartData.findIndex((item) => item.id === id);
  console.log(cartIndex);

  //update price
  const cartItme = cartData.find((item) => item.id === id);
  priceTotal -= priceStringToNumber(cartItme.course.discountPrice);
  cartPriceTotal.innerHTML = `總金額：${priceTotal} NTD`;

  //Delet item and item localStorage

  cartData.splice(cartIndex, 1);
  localStorage.setItem("cart", JSON.stringify(cartData));
  if (cartData.length) {
    cartModal.innerHTML = "";
    cartData.forEach((item) => {
      creatCartHTML(item);
    });
    cartCounter.innerHTML = `${cartData.length}`;
    buyCheck.classList.remove("disabled");
  } else {
    cartCounter.classList.add("d-none");
    cartModal.innerHTML = `
    <div class = "py-104 d-flex flex-column justify-content-center">
      <p class="text-info text-center fs-5 mb-16">目前沒有任何商品</p>
      <a class="btn btn-primary text-white w-50 mx-auto" href="./search.html">點擊！前往購買頁面</a>
    </div>
    `;
    buyCheck.classList.add("disabled");
  }
}

//課程彈跳視窗
function courseModal(id) {
  const item = userData.find((item) => item.id === id);

  modalContent.innerHTML = `
    <div class="modal-header border-0 p-4">
    <img
      class="object-cover img-fuild w-100"
      src=" ${item.course.img}"
      alt=""
    />
  </div>
  <div class="modal-body text-black">
    <h5 class="modal-title mb-8" id="exampleModalLabel">
      ${item.course.name}
    </h5>

    <div
      class="d-flex justify-content-around my-16 flex-column flex-md-row justify-content-center align-items-center"
    >
      <img
        class="rounded-circle"
        src="${item.avatar}"
        alt=""
        width="128"
        height="128"
      />
      <div class="list-unstyled">
        <div>
          <p class="text-center text-md-start">
            講師：<a href="#"
              >${item.last_name + " " + item.first_name}</a
            >
          </p>
          <ul
            class="list-unstyled bg-primary d-flex rounded-3 p-8 gap-4 justify-content-around"
          >
            <li>
              <a href="#">
                <img
                  src="./assets/images/instagram.png"
                  alt=""
                  width="25"
                  height="25"
              /></a>
            </li>
            <li>
              <a href="#">
                <img
                  src="./assets/images/facebook.png"
                  alt=""
                  width="25"
                  height="25"
                />
              </a>
            </li>
            <li>
              <a href="#">
                <img
                  src="./assets/images/youtube.png"
                  alt=""
                  width="25"
                  height="25"
                />
              </a>
            </li>
          </ul>
        </div>

        <div class="d-flex gap-8">
          <ul class="list-unstyled">
            <li>教學經歷：</li>
            <li>item</li>
            <li>item</li>
            <li>item</li>
          </ul>
          <ul class="list-unstyled">
            <li>參賽經驗：</li>
            <li>item</li>
            <li>item</li>
            <li>item</li>
          </ul>
        </div>
      </div>
      <div></div>
    </div>
    <div class="row border text-center mb-32">
      <div class="col-4 border-end">
        <p>學生人數</p>
        <p class="mb-0">${item.course.studentNumber}</p>
      </div>
      <div class="col-4 border-end">
        <p>課程分數</p>
        <p class="course-score mb-0">${item.course.rating}</p>
      </div>
      <div class="col-4">
        <p>課程總時數</p>
        <p class="course-time mb-0">${item.course.courseHours}</p>
      </div>
    </div>

    <div class="d-flex justify-content-around">
      <div>
        <h5>課程內容：</h5>
        <ul>
          <li>item1</li>
          <li>item2</li>
          <li>item3</li>
          <li>item4</li>
        </ul>
      </div>

      <div>
        <h5 class="fw-bold">此課程權益：</h5>
        <ul class="list-unstyled">
          <li>30 天退款保證</li>
          <li>透過裝置與電視存取</li>
          <li>完整終身存取權</li>
          <li>結業證書</li>
        </ul>
      </div>
    </div>
    <ul class="d-flex gap-16 list-unstyled justify-content-center">
      <li><a href="#">分享</a></li>
      <li><a href="#">將此課程贈送</a></li>
      <li><a href="#">套用優惠卷</a></li>
    </ul>
  </div>
  <div class="modal-footer">
    <div class="d-flex gap-8">
      <p class="fs-5 text-black">定價：${item.course.discountPrice}</p>
      <p
        class="course-discountPrice text-decoration-line-through text-info mt-auto"
      >
        ${item.course.price}
      </p>
    </div>
    <button
      class="btn btn-primary w-100 text-white btn-cart mb-8"
      data-id="${item.id}"
    >
      新增至購物車
    </button>
    <button
      type="button"
      class="btn btn-secondary w-100"
      data-bs-dismiss="modal"
    >
      Close
    </button>
  </div>
      `;
}

//確認點擊購物車或者是more btn
body.addEventListener("click", (e) => {
  const targetNumber = Number(e.target.dataset.id);
  if (e.target.matches(".btn-cart")) {
    addCart(targetNumber);
  }
  if (e.target.matches(".btn-more")) {
    courseModal(targetNumber);
  }
  if (e.target.matches(".btn-danger")) {
    deletCart(targetNumber);
    //更新buy.html
    if (fileName.toLowerCase().includes("buy")) {
      buyListCreatHTML(cartData);
      updataBuyPrice(priceTotal);
    }
  }
});

buyCheck.addEventListener("click", (e) => {
  if (!cartData.length) {
    e.preventDefault();
    return alert("購物車內目前無商品");
  }
});

btnCartModal.addEventListener("click", (e) => {
  if (!cartData.length) {
    buyCheck.classList.add("disabled");
  } else {
    buyCheck.classList.remove("disabled");
  }
});
