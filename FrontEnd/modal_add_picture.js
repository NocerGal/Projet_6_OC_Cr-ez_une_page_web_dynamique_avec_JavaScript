import { cleanPhotoGallery } from "./functions/modal_galery.js";
import { generationCurrentPhotoGallery } from "./functions/modal_galery.js";
import { photos, categories } from "./functions/constants/api.js";
import { classPicture, classCategory } from "./classPicture.js";
import { firstGenerationElements } from "./functions/generationFigureElements.js";
import { dataURLtoFile } from "./functions/dataURLtoFile.js";

let modalAddPicture = null;
let modal = null;
let focusables = [];
const focusableSelector = "button, a, input, textaerea";
let previouslyFocusedElement = null;
let currendModal = null;
let previousModal = null;
let addedPicture = null;
const newPicture = document.createElement("img");
let imagePicture = [];

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

  document
    .querySelectorAll(".gallery figure")
    .forEach((photo) => photo.remove());

  firstGenerationElements();
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

document
  .querySelector(".add-picture #photo-upload")
  .addEventListener("change", function (e) {
    document.querySelector(".zone-add-picture i").style.display = "none";
    document.querySelector(".zone-add-picture label").style.display = "none";
    document.querySelector(".zone-add-picture span").style.display = "none";
    e.target.display = "none";
    addedPicture = e.target.files;
    // imagePicture.push(addedPicture[0]);

    // ====================================
    const reader = new FileReader();

    const files = this.files[0];

    imagePicture.push(files);
    console.log(reader.readAsDataURL(this.files[0]));
    sessionStorage.setItem("preview-image", reader.result);

    reader.addEventListener("load", () => {
      console.log(files);
      sessionStorage.setItem("preview-image", reader.result);
      const fileString = sessionStorage.getItem("preview-image");
      console.log(fileString);
      console.log(dataURLtoFile(fileString, "Stop"));

      displayPictures();
    });
    // ====================================
  });

function displayPictures() {
  imagePicture.forEach(() => {
    newPicture.src = sessionStorage.getItem("preview-image");
    newPicture.classList = "added-picture";
    document.querySelector(".zone-add-picture").appendChild(newPicture);
  });
}

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

function addNewPicture(newPicture) {
  let listPhotos = JSON.parse(sessionStorage.getItem("photosForGallery"));
  listPhotos.push(newPicture);
  sessionStorage.setItem("photosForGallery", JSON.stringify(listPhotos));
}
