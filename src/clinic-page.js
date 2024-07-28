document.querySelector("#menu").addEventListener("click", function () {
  document.querySelector("#nav-links").style.display =
    document.querySelector("#nav-links").style.display == "none"
      ? "block"
      : "none";
});
