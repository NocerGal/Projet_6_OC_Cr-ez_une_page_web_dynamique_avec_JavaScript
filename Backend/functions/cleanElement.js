// Function permettant de supprimer tous les figure du HTML
export function cleanElements() {
  const allPictures = document.querySelectorAll("#portfolio .gallery figure");

  for (let i = 0; i < allPictures.length; i++) {
    allPictures[i].remove();
  }
}
