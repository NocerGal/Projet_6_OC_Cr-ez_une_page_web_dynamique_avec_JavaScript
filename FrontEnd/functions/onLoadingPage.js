export function onloadingPage() {
  window.addEventListener("load", (e) => {
    console.log("page chargée");
  });

  window.onload = function () {
    const photosForGallery = JSON.parse(
      sessionStorage.getItem("photosForGallery")
    );
    const selectAllPreviewPicture =
      document.querySelectorAll(".gallery figure");
    console.log(selectAllPreviewPicture);
    console.log(photosForGallery);
    console.log("ok");
  };

  document.addEventListener("DOMContentLoaded", (e) => {
    console.log("DOMloaded");
  });

  document.addEventListener("readystatechange", (event) => {
    console.log("ok");
  });
}
