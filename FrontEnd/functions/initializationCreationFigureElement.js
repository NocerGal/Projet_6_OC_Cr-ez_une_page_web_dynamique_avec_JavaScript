export function creationFigureElement(picsRegardingFilter, container) {
  for (let i = 0; i < picsRegardingFilter.length; i++) {
    const selectGallery = document.querySelector(container);

    const figureElement = document.createElement("figure");
    const imageElement = document.createElement("img");
    const figcaptionElement = document.createElement("figcaption");

    imageElement.classList = picsRegardingFilter[i].id;
    imageElement.src = picsRegardingFilter[i].imageUrl;
    imageElement.alt = picsRegardingFilter[i].title;
    figcaptionElement.innerHTML = picsRegardingFilter[i].title;

    figureElement.appendChild(imageElement);
    figureElement.appendChild(figcaptionElement);

    selectGallery.appendChild(figureElement);
  }
}
