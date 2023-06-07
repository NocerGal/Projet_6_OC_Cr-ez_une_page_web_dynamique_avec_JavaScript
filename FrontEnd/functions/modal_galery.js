import { photos } from "./constants/index.js";
import { creationFigureElement } from "./initializationCreationFigureElement.js";

export function generationCurrentPhotoGallery() {
  const selectModalGalery = "#galery-modal";

  creationFigureElement(photos, selectModalGalery);

  const allFigationOfPicturesInEditionGallery = document.querySelectorAll(
    "#galery-modal figure figcaption"
  );
  allFigationOfPicturesInEditionGallery.forEach(
    (figaption) => (figaption.innerHTML = "éditer")
  );

  function generationIcones(figure) {
    const currentFigure = figure;
    const creationIconeEditPics = document.createElement("div");
    const trashDiv = document.createElement("div");
    const multiCrossDiv = document.createElement("div");
    const creationTrashIcon = document.createElement("i");
    const creationMultiCross = document.createElement("i");

    creationIconeEditPics.classList = "js-edit-icones";
    trashDiv.classList = "js-trash-div";
    multiCrossDiv.classList = "js-multicross-div";
    creationTrashIcon.classList = "fa-solid fa-trash-can";
    creationMultiCross.classList = "fa-solid fa-arrows-up-down-left-right";

    trashDiv.appendChild(creationTrashIcon);
    multiCrossDiv.appendChild(creationMultiCross);
    creationIconeEditPics.appendChild(trashDiv);
    creationIconeEditPics.appendChild(multiCrossDiv);

    currentFigure.appendChild(creationIconeEditPics);
    // function pour ajouter les icones à chaque photo de la galerie
  }

  const figuresSelected = document.querySelectorAll("#galery-modal figure");

  figuresSelected.forEach((figure) => generationIcones(figure));
}

export function cleanPhotoGallery() {
  const allPicturesInEditionGallery = document.querySelectorAll(
    "#galery-modal figure"
  );
  allPicturesInEditionGallery.forEach((photos) => photos.remove());
}
