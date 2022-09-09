if (fileName.toLowerCase().includes("track")) {
  const courseItemList = document.querySelector(".course-item-list");
  console.log(courseItemList);
  renderCourseItem();
  //購買課程
  function renderCourseItem() {
    courseItemList.innerHTML = "";
    myItemList.forEach((item) => {
      courseItemList.innerHTML += `
      <div class="col-md-4 mb-24">
                    <div class="card h-100">
                      <img src="${
                        item.course.img
                      }" class="card-img-top object-cover" alt="..." height="175">
                      <div class="card-body">
                        <p class="card-title">${item.course.name}</p>
                        <div class="progress">
                          <div class="progress-bar" role="progressbar" style="width: 0%" aria-valuenow="0"aria-valuemin="0" aria-valuemax="100"></div>
                    </div>
                    <div class="d-flex justify-content-between mt-16">
                        <p class="mb-0">0% 完成</p>
                        <p class="mb-0">作者：${
                          item.first_name + " " + item.last_name
                        }</p>
                    </div>
            </div>
        </div>
    </div>
      `;
    });
  }
}
