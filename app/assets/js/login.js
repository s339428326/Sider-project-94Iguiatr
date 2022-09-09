if (fileName.toLowerCase().includes("login")) {
  const btnLogin = document.querySelector(".btn-login");

  btnLogin.addEventListener("click", (e) => {
    localStorage.setItem("login", true);
    dropdownAccount.classList.remove(".d-none");
    navLogin.classList.add(".d-none");
  });
}
