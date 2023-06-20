import { cleanPhotoGallery } from "./functions/modal_galery.js";
import { generationCurrentPhotoGallery } from "./functions/modal_galery.js";
import { categories } from "./functions/constants/api.js";
import { classPicture, classCategory } from "./classPicture.js";
import { firstGenerationElements } from "./functions/generationFigureElements.js";
import { dataURLtoFile } from "./functions/dataURLtoFile.js";
import { displayPictures } from "./displayPictures.js";
import { addNewPicture } from "./addNewPicture.js";

const openModalAddPicture = function () {
  let modal = document.querySelector("#modal");
  let modalAddPicture = document.querySelector(".add-picture");
  const focusableSelector = "button, a, input, textaerea";
  let focusables = Array.from(modal.querySelectorAll(focusableSelector));
  let previouslyFocusedElement = document.querySelector(":focus");

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
  modal.removeEventListener("click", openModalAddPicture);
};

document
  .querySelector(".add-pics")
  .addEventListener("click", openModalAddPicture);

const closeModal = function (e) {
  let modalAddPicture = document.querySelector(".add-picture");
  let previouslyFocusedElement = document.querySelector(":focus");
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
    modalAddPicture.removeEventListener("animationend", hideModal);
    modalAddPicture.style.display = "none";
    modalAddPicture = null;
  };

  modalAddPicture.addEventListener("animationend", hideModal);

  document
    .querySelectorAll(".gallery figure")
    .forEach((photo) => photo.remove());

  firstGenerationElements();
};

const returnToPortfolioEdition = function (e) {
  let currendModal = document.querySelector(".add-picture");
  let previousModal = document.querySelector(
    e.currentTarget.getAttribute("href")
  );
  e.preventDefault();
  cleanPhotoGallery();
  generationCurrentPhotoGallery();
  const focusableSelector = "button, a, input, textaerea";
  let focusables = Array.from(modal.querySelectorAll(focusableSelector));
  let previouslyFocusedElement = document.querySelector(":focus");
  focusables[0].focus();
  previousModal.style.display = null;
  previousModal.removeAttribute("aria-hidden");
  previousModal.setAttribute("aria-modal", "true");
  currendModal.style.display = "none";
  currendModal.setAttribute("aria-hidden", "true");

  currendModal.addEventListener("click", closeModal);
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
  const focusableSelector = "button, a, input, textaerea";
  let focusables = Array.from(modal.querySelectorAll(focusableSelector));
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

document
  .querySelector(".add-picture #photo-upload")
  .addEventListener("change", function (e) {
    document.querySelector(".zone-add-picture i").style.display = "none";
    document.querySelector(".zone-add-picture label").style.display = "none";
    document.querySelector(".zone-add-picture span").style.display = "none";
    e.target.display = "none";
    let addedPicture = e.target.files;
    let imagePicture = [];
    const reader = new FileReader();
    const files = addedPicture;

    imagePicture.push(files);
    reader.readAsDataURL(this.files[0]);
    sessionStorage.setItem("preview-image", reader.result);

    reader.addEventListener("load", () => {
      sessionStorage.setItem("preview-image", reader.result);
      const fileString = sessionStorage.getItem("preview-image");

      displayPictures(imagePicture);
    });
  });

document
  .querySelector(".add-picture form")
  .addEventListener("submit", function (e) {
    const form = e.currentTarget;
    const data = new FormData(form);
    const title = data.get("titre");
    const categorie = document.querySelector(".add-picture form select").value;
    let indexPhotosToErase;
    if (JSON.parse(sessionStorage.getItem("photosToErase")) === null) {
      indexPhotosToErase = 0;
    } else {
      indexPhotosToErase = sessionStorage.getItem("photosToErase").length;
    }
    const id =
      JSON.parse(sessionStorage.getItem("photosForGallery")).length +
      indexPhotosToErase +
      1;
    const imageUrl = sessionStorage.getItem("preview-image");
    const indexCategorie = categories.findIndex(
      (index) => index.name == categorie
    );
    const idCategories = indexCategorie + 1;
    const userId = JSON.parse(sessionStorage.getItem("id"));
    const nameObjet = categories[indexCategorie].name;

    const newCategorie = new classCategory(idCategories, nameObjet);
    const newPictureAdded = new classPicture(
      id,
      title,
      imageUrl,
      idCategories,
      userId,
      newCategorie
    );

    if (sessionStorage.getItem("photosToPublish") === null) {
      let arr = [];
      arr.push(new classPicture(id, title, imageUrl, idCategories, userId));
      sessionStorage.setItem("photosToPublish", JSON.stringify(arr));
    } else {
      const photoToPublish = new classPicture(
        id,
        title,
        imageUrl,
        idCategories,
        userId
      );
      let listPhotoToPublish = JSON.parse(
        sessionStorage.getItem("photosToPublish")
      );
      listPhotoToPublish.push(photoToPublish);
      sessionStorage.setItem(
        "photosToPublish",
        JSON.stringify(listPhotoToPublish)
      );
    }
    addNewPicture(newPictureAdded);
  });
