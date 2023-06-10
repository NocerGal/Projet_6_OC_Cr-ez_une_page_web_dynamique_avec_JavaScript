export function logout() {
  document.querySelector(".logout").addEventListener("click", function () {
    sessionStorage.clear();
  });
}
