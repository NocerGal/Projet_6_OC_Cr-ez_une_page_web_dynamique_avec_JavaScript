export function cleanPhotoGallery() {
  document
    .querySelectorAll("#galery-modal figure")
    .forEach((photos) => photos.remove());
}
