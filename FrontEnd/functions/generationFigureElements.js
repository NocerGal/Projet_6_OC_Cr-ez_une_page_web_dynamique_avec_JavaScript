import { photos } from "./constants/index.js";
import { creationFigureElement } from "./initializationCreationFigureElement.js";

export function firstGenerationElements() {
  if (sessionStorage.getItem("photosForGallery") === null) {
    sessionStorage.setItem("photosForGallery", JSON.stringify(photos));
    creationFigureElement(
      JSON.parse(sessionStorage.getItem("photosForGallery")),
      ".gallery"
    );
  } else {
    creationFigureElement(
      JSON.parse(sessionStorage.getItem("photosForGallery")),
      ".gallery"
    );
  }
}
