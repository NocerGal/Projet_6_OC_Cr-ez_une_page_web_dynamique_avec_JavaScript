export function addNewPicture(newPicture) {
  let listPhotos = JSON.parse(sessionStorage.getItem("photosForGallery"));
  listPhotos.push(newPicture);
  sessionStorage.setItem("photosForGallery", JSON.stringify(listPhotos));
}
