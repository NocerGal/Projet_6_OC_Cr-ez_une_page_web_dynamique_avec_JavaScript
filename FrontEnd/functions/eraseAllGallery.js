import { classPicture } from "../classPicture.js";

export function eraseAllGallery() {
  if (confirm("Voulez-vous vraiment supprimer la gallerie?") != true) {
    return;
  } else {
    storeAllPics();
    eraseUnpublishedPictures();
    eraseDisplayedPictures();
  }
}

function storeAllPics() {
  const selectPicture = document.querySelectorAll("#galery-modal figure img");
  selectPicture.forEach((id) => pushPicture(id.getAttribute("class")));
}

function pushPicture(id) {
  let arr = [];
  arr.push(new classPicture(id));

  if (sessionStorage.getItem("photosToErase") === null) {
    sessionStorage.setItem("photosToErase", JSON.stringify(arr));
    return;
  }
  const sessionPhotoToErase = JSON.parse(
    sessionStorage.getItem("photosToErase")
  );
  sessionPhotoToErase.push(new classPicture(id));
  sessionStorage.setItem("photosToErase", JSON.stringify(sessionPhotoToErase));
}

function eraseUnpublishedPictures() {
  const sessionPhotoToErase = JSON.parse(
    sessionStorage.getItem("photosToErase")
  );

  for (let i = 0; sessionPhotoToErase.length > i; i++) {
    if (JSON.parse(sessionStorage.getItem("photosToPublish")) === null) {
      return;
    } else {
      const photoToPublish = JSON.parse(
        sessionStorage.getItem("photosToPublish")
      );
      let index = photoToPublish.findIndex(
        (e) => sessionPhotoToErase[i] == e.id
      );
      if (JSON.stringify(photoToPublish.splice(index, 0) === null)) {
        sessionStorage.removeItem("photosToPublish");
      } else {
        JSON.stringify(
          "photosToPublish",
          JSON.stringify(photoToPublish.splice(index, 0))
        );
      }
    }
  }
}

function eraseDisplayedPictures() {
  document
    .querySelectorAll("#galery-modal figure")
    .forEach((pic) => pic.remove());

  sessionStorage.removeItem("photosForGallery");
}
