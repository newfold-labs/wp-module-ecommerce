(function () {
  let section = new URLSearchParams(window.location.search);
  if (section.has("return_to_nfd")) {
    let goBack = document.createElement("a");
    goBack.ariaRoleDescription = "Go Back to Bluehost WordPress Plugin";
    goBack.className = "nfd-woocommerce-link";
    goBack.innerText = "← Back";
    goBack.href = `admin.php?page=bluehost#${section.get("return_to_nfd")}`;
    let wcRoot = document.getElementById("wpbody-content");
    wcRoot.insertAdjacentElement("beforebegin", goBack);
  }
})();
