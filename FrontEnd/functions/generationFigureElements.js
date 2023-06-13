import { photos } from "./constants/index.js";
import { creationFigureElement } from "./initializationCreationFigureElement.js";

export function firstGenerationElements() {
  let localStoragePictures = sessionStorage.setItem(
    "photosForGallery",
    JSON.stringify(photos)
  );

  creationFigureElement(
    JSON.parse(sessionStorage.getItem("photosForGallery")),
    ".gallery"
  );
}
