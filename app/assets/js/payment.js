if (fileName.toLowerCase().includes("payment")) {
  const paymentTotal = document.querySelector(".payment-total");
  const btnPayment = document.querySelector(".btn-payment");
  paymentTotal.innerHTML = `$ ${priceTotal} NTD`;
  btnCartModal.dataset.bsTarget = "";
  btnPayment.addEventListener("click", (e) => {
    if (myItemList.length > 0) {
      let newItem = cartData;
      const oldMyItem = JSON.parse(localStorage.getItem("course"));
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
