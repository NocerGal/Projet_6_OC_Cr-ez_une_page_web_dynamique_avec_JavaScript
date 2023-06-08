import {
  generationCurrentPhotoGallery,
  cleanPhotoGallery,
} from "./functions/modal_galery.js";

let modal = null;
const focusableSelector = "button, a, input, textaerea";
let focusables = [];
let previouslyFocusedElement = null;

const openModal = function (e) {
  // preventdefautl car on ne veut pas que le click sur le lien fonctionne correctement.
  e.preventDefault();
  generationCurrentPhotoGallery();
  modal = document.querySelector(e.target.getAttribute("href"));
  focusables = Array.from(modal.querySelectorAll(focusableSelector));
  previouslyFocusedElement = document.querySelector(":focus");
  focusables[0].focus();
  modal.style.display = null;
  modal.removeAttribute("aria-hidden");
  modal.setAttribute("aria-modal", "true");
  // Permet lorsqu'on click en dehors de la fenêtre modal de fermer la fen^etre modale
  modal.addEventListener("click", closeModal);
  modal.querySelector(".modal-close").addEventListener("click", closeModal);
  modal
    .querySelector(".modal-wrapper")
    .addEventListener("click", stopPropagation);
  modal
    .querySelectorAll(".modal-trash-icon")
    .forEach((picture) => picture.addEventListener("click", deletePicture));
};

const deletePicture = function (e) {
  let target = e.target;
  const allTrash = document.querySelectorAll(".modal-trash-icon");
  const focusablesTrash = Array.from(allTrash);
  let indexTrash = focusablesTrash.findIndex(
    (f) => f === querySelector(".modal-trash-icon")
  );
  console.log(indexTrash);
};

const closeModal = function (e) {
  if (modal === null) return;
  if (previouslyFocusedElement !== null) previouslyFocusedElement.focus();
  e.preventDefault();
  cleanPhotoGallery();
  modal.setAttribute("aria-hidden", "true");
  modal.removeAttribute("aria-modal");
  modal.removeEventListener("click", closeModal);
  modal.querySelector(".modal-close").removeEventListener("click", closeModal);
  modal
    .querySelector(".modal-wrapper")
    .addEventListener("click", stopPropagation);
  const hideModal = function () {
    modal.style.display = "none";
    modal.removeEventListener("animationend", hideModal);
    modal = null;
  };
  modal.addEventListener("animationend", hideModal);
};

const stopPropagation = function (e) {
  e.stopPropagation();
};

const focusInModal = function (e) {
  e.preventDefault();
  // QuerySelector(":focus") va rechercher l'élément focus. L'élément :focus aura par défaut un élémeent :focus sur lui.
  let index = focusables.findIndex((f) => f === modal.querySelector(":focus"));
  if (e.shiftKey === true) {
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
