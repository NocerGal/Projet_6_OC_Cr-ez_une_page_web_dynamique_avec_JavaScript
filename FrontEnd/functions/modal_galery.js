import { photos } from "./constants/index.js";
import { creationFigureElement } from "./initializationCreationFigureElement.js";
import { erasePicture } from "./erasePicture.js";

export function generationCurrentPhotoGallery() {
  const selectModalGalery = "#galery-modal";

  if (JSON.parse(sessionStorage.getItem("photosForGallery")) === null) {
    return;
  } else {
    creationFigureElement(
      JSON.parse(sessionStorage.getItem("photosForGallery")),
      selectModalGalery
    );
  }

  document
    .querySelectorAll("#galery-modal figure figcaption")
    .forEach((figaption) => (figaption.innerHTML = "éditer"));

  document
    .querySelectorAll("#galery-modal figure")
    .forEach((figure) => generateIcons(figure));
}

export function generateIcons(currentFigure) {
  const creationIconeEditPics = document.createElement("div");
  const trashDiv = document.createElement("div");
  const multiCrossDiv = document.createElement("div");
  const creationTrashIcon = document.createElement("i");
  const creationMultiCross = document.createElement("i");

  creationIconeEditPics.classList = "modal-pics-edition";
  trashDiv.classList = "modal-trash-icon";
  multiCrossDiv.classList = "modal-multicross-icon";
  creationTrashIcon.classList = "fa-solid fa-trash-can";
  creationMultiCross.classList = "fa-solid fa-arrows-up-down-left-right";

  trashDiv.addEventListener("click", function (e) {
    erasePicture(e);
  });

  multiCrossDiv.addEventListener("click", function (e) {
    let indexOfMultiCross = Array.from(
      document.querySelectorAll(".fa-arrows-up-down-left-right")
    ).indexOf(e.target);
  });

  trashDiv.appendChild(creationTrashIcon);
  multiCrossDiv.appendChild(creationMultiCross);
  creationIconeEditPics.appendChild(trashDiv);
  creationIconeEditPics.appendChild(multiCrossDiv);

  currentFigure.appendChild(creationIconeEditPics);
}

export function cleanPhotoGallery() {
  document
    .querySelectorAll("#galery-modal figure")
    .forEach((photos) => photos.remove());
}
