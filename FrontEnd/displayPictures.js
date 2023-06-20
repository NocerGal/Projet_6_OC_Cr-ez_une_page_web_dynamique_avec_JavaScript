export function displayPictures(imagePicture) {
  imagePicture.forEach(() => {
    const newPicture = document.createElement("img");
    newPicture.src = sessionStorage.getItem("preview-image");
    newPicture.classList = "added-picture";
    document.querySelector(".zone-add-picture").appendChild(newPicture);
  });
}
