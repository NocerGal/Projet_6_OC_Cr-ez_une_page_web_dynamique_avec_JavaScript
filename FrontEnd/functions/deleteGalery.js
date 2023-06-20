export function deleteAllGallery() {
  const picturesInGallery = JSON.parse(
    sessionStorage.getItem("photosForGallery")
  );

  picturesInGallery.forEach((picture, index) => eraseGallery(picture, index));
}

function eraseGallery(picture, index) {
  if (sessionStorage.getItem("photosToPublish") != "") {
    const picturesInGallery = document.querySelectorAll(
      "#galery-modal figure img"
    );
    const imageAlt = picturesInGallery[index].alt;
    const photosToPublish = JSON.parse(
      sessionStorage.getItem("photosToPublish")
    );

    let indexToErase = photosToPublish.findIndex(
      (index) => index.title == imageAlt
    );

    if (indexToErase != -1) {
      delete photosToPublish[indexToErase];
      sessionStorage.setItem(
        "photosToPublish",
        JSON.stringify(photosToPublish)
      );
      if (photosToPublish === null) {
        sessionStorage.removeItem("photosToPublish");
      } else
        JSON.parse(sessionStorage.setItem("photosToPublish", photosToPublish));
    }

    sessionStorage.setItem("photosToErase", picture);

    photoToErase.push(picture);
    sessionStorage.setItem("photosToErase", JSON.stringify(toErase));
  }
}
