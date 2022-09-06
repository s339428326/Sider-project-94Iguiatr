if (fileName.toLowerCase().includes("payment")) {
  const paymentTotal = document.querySelector(".payment-total");
  const btnPayment = document.querySelector(".btn-payment");
  paymentTotal.innerHTML = `$ ${priceTotal} NTD`;
  btnCartModal.dataset.bsTarget = "";
  btnPayment.addEventListener("click", (e) => {
    localStorage.clear("cart");
    cartData = [];
  });
}
