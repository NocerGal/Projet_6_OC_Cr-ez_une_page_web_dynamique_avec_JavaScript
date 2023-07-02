export function logout() {
  document.querySelector(".logout").addEventListener("click", function () {
    sessionStorage.clear();
    window.location.replace("./homepage_edit.html");
  });
}
