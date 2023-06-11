import { cleanPhotoGallery } from "./functions/modal_galery.js";
import { generationCurrentPhotoGallery } from "./functions/modal_galery.js";

let modalAddPicture = null;
let modal = null;
let focusables = [];
const focusableSelector = "button, a, input, textaerea";
let previouslyFocusedElement = null;
let currendModal = null;
let previousModal = null;

const openModalAddPicture = function () {
  modal = document.querySelector("#modal");
  modalAddPicture = document.querySelector(".add-picture");
  focusables = Array.from(modal.querySelectorAll(focusableSelector));
  previouslyFocusedElement = document.querySelector(":focus");
  focusables[0].focus();
  modalAddPicture.style.display = null;
  modalAddPicture.removeAttribute("aria-hidden");
  modalAddPicture.setAttribute("aria-modal", "true");
  document
    .querySelector(".add-picture .fa-xmark")
    .addEventListener("click", closeModal);
  document
    .querySelector(".add-picture a")
    .addEventListener("click", returnToPortfolioEdition);
  modal.setAttribute("aria-hidden", "true");
  modal.removeAttribute("aria-modal");
  modal.removeEventListener("click", closeModal);
  modal.querySelector(".modal-close").removeEventListener("click", closeModal);
  modal
    .querySelector(".modal-wrapper")
    .addEventListener("click", stopPropagation);
};

document
  .querySelector(".add-pics")
  .addEventListener("click", openModalAddPicture);

const closeModal = function (e) {
  if (modalAddPicture === null) return;
  if (previouslyFocusedElement != null) previouslyFocusedElement.focus();
  e.preventDefault();
  modalAddPicture.setAttribute("aria-hidden", "true");
  modalAddPicture.removeAttribute("aria-modal");
  modalAddPicture.removeEventListener("click", closeModal);
  modalAddPicture
    .querySelector(".modal-close")
    .removeEventListener("click", closeModal);
  modalAddPicture
    .querySelector(".modal-wrapper")
    .addEventListener("click", stopPropagation);
  const hideModal = function () {
    modalAddPicture.style.display = "none";
    modalAddPicture.removeEventListener("animationend", hideModal);
    modalAddPicture = null;
  };
  modalAddPicture.addEventListener("animationend", hideModal);
};

const returnToPortfolioEdition = function (e) {
  currendModal = document.querySelector(".add-picture");
  previousModal = document.querySelector(e.currentTarget.getAttribute("href"));
  e.preventDefault();
  cleanPhotoGallery();
  generationCurrentPhotoGallery();
  focusables = Array.from(previousModal.querySelectorAll(focusableSelector));
  previouslyFocusedElement = document.querySelector(":focus");
  focusables[0].focus();
  previousModal.style.display = null;
  previousModal.removeAttribute("aria-hidden");
  previousModal.setAttribute("aria-modal", "true");
  previousModal
    .querySelector(".add-pics")
    .addEventListener("click", function () {
      previousModal.removeAttribute("arria-hidden");
      previousModal.style.display = "none";
      document.querySelector(".add-picture").style.display = null;
      document.querySelector(".add-picture").removeAttribute("aria-hidden");
      document.querySelector(".add-picture").setAttribute("aria-modal", "true");
    });
  previousModal
    .querySelector(".modal-close")
    .addEventListener("click", closeModal);
  previousModal
    .querySelector(".modal-wrapper")
    .addEventListener("click", stopPropagation);

  currendModal.style.display = "none";
  currendModal.setAttribute("aria-hidden", "true");
  currendModal.removeEventListener("click", closeModal);
  currendModal
    .querySelector(".modal-close")
    .removeEventListener("click", closeModal);
  currendModal
    .querySelector(".modal-wrapper")
    .addEventListener("click", stopPropagation);
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

window.addEventListener("keydown", function (e) {
  if (e.key === "Escape" || e.key === "Esc") {
    closeModal(e);
  }

  if (e.key === "Tab" && modal !== null) {
    focusInModal(e);
  }
});

// Code non testé permettant théoriquement d'ajouter une photo
export function addNewPicture(newPicture) {
  let listPhotos = getPhotos();
  listPhotos.push(newPicture);
  saveNewPhoto(listPhotos);
}

function getPortfolioPhotos() {
  let listPhotos = localStorage.getItem("listpPhotos");
  if (listPhotos == null) {
    return [];
  } else {
    return JSON.parse(listPhotos);
  }
}

function saveNewPhoto(listPhotos) {
  localStorage.setItem("listpPhotos", JSON.stringify(listPhotos));
}
