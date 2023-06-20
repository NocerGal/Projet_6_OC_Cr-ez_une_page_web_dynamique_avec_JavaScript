export function removeModal() {
  modal.removeAttribute("arria-hidden");
  modal.style.display = "none";
  document.querySelector(".add-picture").style.display = null;
  document.querySelector(".add-picture").removeAttribute("aria-hidden");
  document.querySelector(".add-picture").setAttribute("aria-modal", "true");
}
