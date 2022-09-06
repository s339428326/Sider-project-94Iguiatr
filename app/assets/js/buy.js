if (fileName.toLowerCase().includes("buy")) {
  const buyList = document.querySelector(".buy-list");
  const buyPriceList = document.querySelector(".buy-price");
  const buyPriceTotal = document.querySelector(".buy-price-total");
  const buyNext = document.querySelector(".buy-next");

  buyListCreatHTML(cartData);
  updataBuyPrice(priceTotal);

  function buyListCreatHTML(data) {
    let html = "";
    cartData.forEach((item) => {
      html += `
      <li class="rounded-2 shadow p-4 border border-primary">
      <div class="d-flex gap-16 flex-column flex-lg-row">
        <div class="coursr-image my-auto">
          <img
            class="object-cover img-fuild rounded"
            src="${item.course.img}"
            alt=""
            width="124"
            height="124"
          />
        </div>
        <div>
          <ul
            class="list-unstyled h-100 d-flex flex-column justify-content-around"
          >
            <li>課程：${item.course.name}</li>
            <li>講師：${item.first_name + " " + item.last_name}</li>
            <li>課程總時數：${item.course.courseHours}</li>
            <li>
              <div class="d-flex gap-8">
                <p class="fs-5 mb-0">價格：${item.course.discountPrice}</p>
                <p
                  class="mb-0 text-decoration-line-through text-info mt-auto"
                >
                ${item.course.price}
                </p>
              </div>
            </li>
          </ul>
        </div>
        <button class="btn btn-danger ms-lg-auto rounded-end" data-id = "${
          item.id
        }">刪除</button>
      </div>
    </li>
      `;
    });
    buyList.innerHTML = html;
    if (!cartData.length) {
      buyList.innerHTML = `
        <div class = "py-104 d-flex flex-column justify-content-center">
            <p class="text-info text-center fs-5 mb-16">目前沒有任何商品</p>
            <a class="btn btn-primary text-white w-50 mx-auto" href="./search.html">點擊！前往購買頁面</a>
        </div>
        `;
      buyNext.classList.add("disabled");
    } else {
      buyNext.classList.remove("disabled");
    }
  }
  //更新總額
  function updataBuyPrice(price) {
    buyPriceList.innerHTML = `
    <li class="d-flex justify-content-between">
        <p class="mb-0">小計</p>
        <p class="mb-0">$ ${price} NTD</p>
    </li>
    <li class="d-flex justify-content-between">
        <p class="mb-0">今日節省總金額</p>
        <p class="mb-0">$ 0 NTD</p>
    </li>
    <li li class="d-flex justify-content-between">
        <p class="mb-0">運送 (國際優先)</p>
        <p class="mb-0">$ 0 NTD</p>
    </li>
    <li class="d-flex justify-content-between">
        <p class="mb-0">稅款</p>
        <p class="mb-0">$ 0 NTD</p>
    </li>
    `;
    buyPriceTotal.innerHTML = `$ ${price} NTD`;
  }

  buyNext.addEventListener("click", (e) => {
    confirmPurchase = true;
  });
}
