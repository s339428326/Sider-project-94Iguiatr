if (fileName.toLowerCase().includes("search")) {
  const BASE_URL = "https://s339428326.github.io";
  const VER_URL = BASE_URL + "/FakeApi";
  const POSTRE_URL = VER_URL + "/MOCK_DATA.json";

  const body = document.querySelector("body");
  //search bar
  const fakeSearch = document.querySelector(".fake-search");
  const formSelect = document.querySelector(".form-select");
  const searchBtn = document.querySelector(".search-btn");
  //search list
  const courseList = document.querySelector(".course-list"); // value 1
  const articleList = document.querySelector(".article-list"); //value 2
  const tabList = document.querySelector(".tab-list"); //value 3
  //search-content
  const courseSearch = document.querySelector(".course-search");
  //no-search-row
  const noSearchRow = document.querySelector(".no-search-page");
  const searchRow = document.querySelector(".search-page");
  //research btn
  const searchTitle = document.querySelector(".search-title");
  const researchBtn = document.querySelector(".btn-research");

  //建立課程HTML
  function renderCourseList(data, className) {
    let html = "";

    //確認是slider樣式還是一般卡片樣式
    const styleSwitch = filteredData.length ? "col-md-4 mb-24" : "swiper-slide";

    data.forEach((item) => {
      html += `
            <div class="${styleSwitch}">
            <div class="course-card bg-light text-black rounded-2 me-16">
              <div class="course-head">
                <img
                  class="object-cover rounded-top justify-content-center img-fluid"
                  src="${item.course.img}"
                  alt="player-guitar"
                />
                <div class="d-flex justify-content-center mt-8">
                  <p class="course-name">${item.course.name}</p>
                </div>
              </div>
              <div class="course-body d-flex gap-8 px-16 justify-content-center">
                <div class="text-center">
                  <p>學生人數</p>
                  <p class="course-student">${item.course.studentNumber}</p>
                </div>
                <div class="text-center">
                  <p>課程分數</p>
                  <p class="course-score">${item.course.rating}</p>
                </div>
                <div class="text-center">
                  <p>課程總時數</p>
                  <p class="course-time">${item.course.courseHours}</p>
                </div>
              </div>
              <div class="course-footer px-16 pb-16">
                <div class="d-flex justify-content-center fs-5">
                  <p class="mb-0">定價：</p>
                  <p class="course-price pe-8 mb-0">${item.course.discountPrice}</p>
                  <p
                    class="course-discountPrice text-decoration-line-through mb-0 text-info"
                  >
                    ${item.course.price}
                  </p>
                </div>
                <div class="d-flex justify-content-around  mt-8 btn-course">
                  <button class="btn btn-primary btn-cart" data-id="${item.id}">
                    加入購物車
                  </button>
                  <button class="btn btn-primary btn-more" data-id="${item.id}" data-bs-toggle="modal" data-bs-target="#exampleModal">
                    More
                  </button>
                </div>
              </div>
            </div>
          </div>
`;
    });

    className.innerHTML = html;
  }

  function addCart(id) {
    const cartItme = userData.find((item) => item.id === id);
    if (cartData.some((cart) => cart.id === id)) {
      return alert("此項目已在購物車內");
    }
    cartData.push(cartItme);
    localStorage.setItem("cart", JSON.stringify(cartData));
  }

  //購物車功能(未完成) localhost
  body.addEventListener("click", (e) => {
    const targetNumber = Number(e.target.dataset.id);
    if (e.target.matches(".btn-cart")) {
      addCart(targetNumber);
    } else if (e.target.matches(".btn-more")) {
      console.log("bs-5 modal");
    }
  });

  //搜尋功能(click, keydown)
  function searchkeyWord() {
    //暫時需要使用者選擇收尋項目
    if (formSelect.value === "0") return alert("請選擇搜索項目");

    //阻止輸入空字串
    if (fakeSearch.value === "" || fakeSearch.length === 0)
      return alert("請輸入有效關鍵字");

    //如果filteredData已經有東西,則清除
    if (filteredData.length > 0) filteredData = [];

    //將初始搜尋畫面
    courseSearch.innerHTML = "";
    noSearchRow.classList.add("d-none");
    searchRow.classList.remove("d-none");

    //確認目前選擇搜尋項目
    //比對搜尋結果
    const searchResult = fakeSearch.value.trim().toLowerCase();
    const selectNumber = formSelect.value;
    //搜尋課程
    if (selectNumber === "1") {
      filteredData = userData.filter((item) => {
        return item.course.name.toLowerCase().includes(searchResult);
      });
    }
    //搜尋文章(json未建置)
    if (selectNumber === "2") {
      filteredData = userData.filter((item) => {
        return item.article.name.toLowerCase().includes(searchResult);
      });
    }
    //搜尋吉他譜(json未建置)
    if (selectNumber === "3") {
      filteredData = userData.filter((item) => {
        return item.tab.name.toLowerCase().includes(searchResult);
      });
    }

    searchTitle.innerHTML = `目前搜尋結果數量: ${filteredData.length}`;

    if (filteredData.length) {
      renderCourseList(filteredData, courseSearch);
    } else {
      renderCourseList(userData, courseList);
    }

    fakeSearch.value = "";
  }

  //搜尋功能(未完成)
  searchBtn.addEventListener("click", (e) => {
    e.preventDefault();
    searchkeyWord();
  });

  fakeSearch.addEventListener("keydown", (e) => {
    if (e.key === "Enter") {
      e.preventDefault();
      searchkeyWord();
    }
  });

  researchBtn.addEventListener("click", (e) => {
    console.log("click");
    noSearchRow.classList.remove("d-none");
    searchRow.classList.add("d-none");
  });

  //axios讀取json檔案並放入userData
  axios
    .get(POSTRE_URL)
    .then((response) => {
      userData.push(...response.data);
      console.log(userData, "api get data");
      renderCourseList(userData, courseList);
    })
    .catch((error) => {
      {
        console.log(error);
      }
    });
}
