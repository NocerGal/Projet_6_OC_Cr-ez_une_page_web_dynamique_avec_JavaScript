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
  selectPicture.forEach((title) => pushPicture(title.getAttribute("alt")));
}

function pushPicture(title) {
  if (sessionStorage.getItem("galleryToErase") === null) {
    sessionStorage.setItem("galleryToErase", JSON.stringify([title]));
    return;
  }
  const sessionPhotoToErase = JSON.parse(
    sessionStorage.getItem("galleryToErase")
  );
  sessionPhotoToErase.push(title);
  sessionStorage.setItem("galleryToErase", JSON.stringify(sessionPhotoToErase));
}

function eraseUnpublishedPictures() {
  const sessionPhotoToErase = JSON.parse(
    sessionStorage.getItem("galleryToErase")
  );

  for (let i = 0; sessionPhotoToErase.length > i; i++) {
    if (JSON.parse(sessionStorage.getItem("photosToPublish")) === null) {
      return;
    } else {
      const photoToPublish = JSON.parse(
        sessionStorage.getItem("photosToPublish")
      );
      let index = photoToPublish.findIndex(
        (e) => sessionPhotoToErase[i] == e.title
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
