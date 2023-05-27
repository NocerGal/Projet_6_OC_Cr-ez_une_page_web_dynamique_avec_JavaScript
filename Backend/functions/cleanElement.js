// Function permettant de supprimer tous les figure du HTML
export function cleanElements() {

    const selectAllPictures = document.querySelectorAll("#portfolio .gallery figure");

    for (let i = 0; i < selectAllPictures.length; i++) {
        selectAllPictures[i].remove();
    }
}