import {
  generationCurrentPhotoGallery,
  cleanPhotoGallery,
} from "./functions/modal_galery.js";
import { logout } from "./functions/logout.js";
import { removeModal } from "./removeModal.js";
import { eraseAllGallery } from "./functions/eraseAllGallery.js";

logout();

const openModal = function (e) {
  e.preventDefault();
  cleanPhotoGallery();
  generationCurrentPhotoGallery();
  const focusableSelector = "button, a, input, textaerea";
  let modal = document.querySelector(e.target.getAttribute("href"));
  let focusables = Array.from(modal.querySelectorAll(focusableSelector));
  let previouslyFocusedElement = document.querySelector(":focus");
  focusables[0].focus();
  modal.style.display = null;
  modal.removeAttribute("aria-hidden");
  modal.setAttribute("aria-modal", "true");
  modal.querySelector(".add-pics").addEventListener("click", removeModal);
  modal
    .querySelector(".delete-galery")
    .addEventListener("click", eraseAllGallery);

  // Permet lorsqu'on click en dehors de la fenêtre modal de fermer la fen^etre modale
  modal.addEventListener("click", closeModal);
  modal.querySelector(".modal-close").addEventListener("click", closeModal);

  modal
    .querySelector(".modal-wrapper")
    .addEventListener("click", stopPropagation);
};

const closeModal = function (e) {
  let previouslyFocusedElement = document.querySelector(":focus");
  if (modal === null) return;
  if (previouslyFocusedElement !== null) previouslyFocusedElement.focus();
  e.preventDefault();

  modal.setAttribute("aria-hidden", "true");
  modal.removeAttribute("aria-modal");
  modal.removeEventListener("click", closeModal);
  modal.querySelector(".modal-close").removeEventListener("click", closeModal);
  document.querySelector(".add-pics").removeEventListener("click", removeModal);
  modal
    .querySelector(".delete-galery")
    .removeEventListener("click", eraseAllGallery);
  modal
    .querySelector(".modal-wrapper")
    .addEventListener("click", stopPropagation);
  const hideModal = function () {
    modal.style.display = "none";
    modal.removeEventListener("animationend", hideModal);
  };
  modal.addEventListener("animationend", hideModal);
};

const stopPropagation = function (e) {
  e.stopPropagation();
};

const focusInModal = function (e) {
  e.preventDefault();
  // QuerySelector(":focus") va rechercher l'élément focus. L'élément :focus aura par défaut un élémeent :focus sur lui.

  const focusableSelector = "button, a, input, textaerea, span";
  let focusables = Array.from(modal.querySelectorAll(focusableSelector));
  let index = focusables.findIndex((f) => f === modal.querySelector(":focus"));

  if (e.shiftKey === false) {
    index--;
  } else {
    index++;
  }
  if (index < 0) {
    index = focusables.length - 1;
  }
  if (index >= focusables.length) {
    index = 0;
  }
  focusables[index].focus();
};

document.querySelectorAll(".edit-portfolio").forEach((a) => {
  a.addEventListener("click", openModal);
});

window.addEventListener("keydown", function (e) {
  if (e.key === "Escape" || e.key === "Esc") {
    closeModal(e);
  }

  if (e.key === "Tab" && modal !== null) {
    focusInModal(e);
  }
});
