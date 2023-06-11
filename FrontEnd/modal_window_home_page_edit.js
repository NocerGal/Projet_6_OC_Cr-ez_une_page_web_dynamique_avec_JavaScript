import {
  generationCurrentPhotoGallery,
  cleanPhotoGallery,
} from "./functions/modal_galery.js";
import { logout } from "./functions/logout.js";
import { photos } from "./functions/constants/index.js";

let modal = null;
const focusableSelector = "button, a, input, textaerea";
let focusables = [];
let previouslyFocusedElement = null;

logout();

const openModal = function (e) {
  e.preventDefault();
  generationCurrentPhotoGallery();
  modal = document.querySelector(e.target.getAttribute("href"));
  focusables = Array.from(modal.querySelectorAll(focusableSelector));
  previouslyFocusedElement = document.querySelector(":focus");
  focusables[0].focus();
  modal.style.display = null;
  modal.removeAttribute("aria-hidden");
  modal.setAttribute("aria-modal", "true");
  modal.querySelector(".add-pics").addEventListener("click", function () {
    console.log("ok");
    modal.removeAttribute("arria-hidden");
    modal.style.display = "none";
    document.querySelector(".add-picture").style.display = null;
    document.querySelector(".add-picture").removeAttribute("aria-hidden");
    document.querySelector(".add-picture").setAttribute("aria-modal", "true");
  });
  // Permet lorsqu'on click en dehors de la fenêtre modal de fermer la fen^etre modale
  modal.addEventListener("click", closeModal);
  modal.querySelector(".modal-close").addEventListener("click", closeModal);
  modal
    .querySelector(".modal-wrapper")
    .addEventListener("click", stopPropagation);
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

// Code non testé permettant théoriquement d'ajouter une photo
function addNewPicture(newPicture) {
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
