// Code non testé permettant théoriquement d'ajouter une photo
export function addNewPicture(newPicture) {
  let listPhotos = getPhotos();
  listPhotos.push(newPicture);
  saveNewPhoto(listPhotos);
}

function getPortfolioPhotos() {
  let listPhotos = localStorage.getItem("listpPhotos");
  if (listPhotos == null) {
    return [];
  } else {
    return JSON.parse(listPhotos);
  }
}

function saveNewPhoto(listPhotos) {
  localStorage.setItem("listpPhotos", JSON.stringify(listPhotos));
}
