import { erasePicture } from "./erasePicture.1.js";
import { publishNewGallery } from "./publishNewGallery.js";

document.querySelector(".model-publish").addEventListener("click", () => {
  if (
    confirm("Voulez-vous publier l'ensemble des changements réalisés?") != true
  ) {
    return;
  } else {
    const pictureToErase = JSON.parse(sessionStorage.getItem("photosToErase"));
    const pictureToPublish = JSON.parse(
      sessionStorage.getItem("photosToPublish")
    );

    if (pictureToPublish != null)
      pictureToPublish.forEach((picture, index) =>
        publishNewGallery(picture, index)
      );

    if (pictureToErase != null) {
      pictureToErase.forEach((picture, index) => erasePicture(picture, index));
    }

    sessionStorage.removeItem("photosToPublish");
    sessionStorage.removeItem("photosToErase");
  }
});
