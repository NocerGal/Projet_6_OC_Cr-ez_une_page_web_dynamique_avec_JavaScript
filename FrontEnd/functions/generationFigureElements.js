import { photos } from "./constants/index.js";
import { creationFigureElement } from "./initializationCreationFigureElement.js";

export function firstGenerationElements() {
  creationFigureElement(photos, ".gallery");
}
