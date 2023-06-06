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
}

export function cleanPhotoGallery() {
  const allPicturesInEditionGallery = document.querySelectorAll(
    "#galery-modal figure"
  );
  allPicturesInEditionGallery.forEach((photos) => photos.remove());
}
