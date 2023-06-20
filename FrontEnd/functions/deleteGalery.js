import { eraseGallery } from "./eraseGallery.js";

export function deleteAllGallery() {
  const picturesInGallery = JSON.parse(
    sessionStorage.getItem("photosForGallery")
  );

  picturesInGallery.forEach((picture, index) => eraseGallery(picture, index));
}
