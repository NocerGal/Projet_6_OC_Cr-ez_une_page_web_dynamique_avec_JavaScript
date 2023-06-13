import { creationFigureElement } from "./initializationCreationFigureElement.js";
import { generateIcons } from "./modal_galery.js";

export function erasePicture(e) {
  let sessionStorageGallery = JSON.parse(
    sessionStorage.getItem("photosForGallery")
  );
  let indexOfTrash = Array.from(
    document.querySelectorAll("#galery-modal .fa-trash-can")
  ).indexOf(e.target);
  sessionStorageGallery.splice(indexOfTrash, 1);
  sessionStorage.setItem(
    "photosForGallery",
    JSON.stringify(sessionStorageGallery)
  );

  document
    .querySelectorAll("#galery-modal figure")
    .forEach((picture) => picture.remove());

  JSON.parse(sessionStorage.getItem("photosForGallery")).forEach(
    (picture, index) => refreshGallery(picture, index)
  );

  function refreshGallery(picture, index) {
    const galleryRefresh = document.createElement("figure");

    const pictureRefresh = document.createElement("img");
    const figaptionRefresh = document.createElement("figcaption");

    pictureRefresh.src = JSON.parse(sessionStorage.getItem("photosForGallery"))[
      index
    ].imageUrl;

    figaptionRefresh.innerHTML = "éditer";

    galleryRefresh.appendChild(pictureRefresh);
    galleryRefresh.appendChild(figaptionRefresh);

    document.querySelector("#galery-modal").appendChild(galleryRefresh);
  }
  document
    .querySelectorAll("#galery-modal figure")
    .forEach((figure) => generateIcons(figure));
}
