export function logout() {
  document.querySelector(".logout").addEventListener("click", function () {
    debugger;
    sessionStorage.clear();
  });
}
