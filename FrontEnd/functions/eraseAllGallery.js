export function eraseAllGallery() {
  storageAllPics();
  eraseNotPublisedPictures();
  erasePictureDisplayed();
}

const storageAllPics = function () {
  const selectPicture = document.querySelectorAll("#galery-modal figure img");

  selectPicture.forEach((title) => pushPicture(title.getAttribute("alt")));
};

const pushPicture = function (title) {
  let arr = [];
  arr.push(title);

  if (sessionStorage.getItem("galleryToErase") === null) {
    sessionStorage.setItem("galleryToErase", JSON.stringify(arr));
    return;
  }
  const sessionPhotoToErase = JSON.parse(
    sessionStorage.getItem("galleryToErase")
  );
  sessionPhotoToErase.push(title);
  sessionStorage.setItem("galleryToErase", JSON.stringify(sessionPhotoToErase));
};

const eraseNotPublisedPictures = function () {
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
};

const erasePictureDisplayed = function () {
  document
    .querySelectorAll("#galery-modal figure")
    .forEach((pic) => pic.remove());

  sessionStorage.removeItem("photosForGallery");
};
