import { figureImg, figureTitre } from "./constants/index.js";

const apiPhotos = await fetch("http://localhost:5678/api/works");
const photos = await apiPhotos.json();

export function creationFigureElement() {
  for (let i = 0; i < photos.length; i++) {
    const selectGallery = document.querySelector(".gallery");

    const figureElement = document.createElement("figure");
    const imageElement = document.createElement("img");
    const figcaptionElement = document.createElement("figcaption");

    imageElement.src = figureImg[i];
    imageElement.alt = figureTitre[i];
    figcaptionElement.innerHTML = figureTitre[i];

    figureElement.appendChild(imageElement);
    figureElement.appendChild(figcaptionElement);

    selectGallery.appendChild(figureElement);
  }
}