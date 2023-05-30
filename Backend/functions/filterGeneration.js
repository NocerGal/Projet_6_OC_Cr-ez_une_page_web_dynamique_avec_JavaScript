const apiCategories = await fetch("http://localhost:5678/api/categories");
const categories = await apiCategories.json();

const apiPhotos = await fetch("http://localhost:5678/api/works");
const photos = await apiPhotos.json();

export function filterGeneration() {

    for (let i = photos.length - 1; i >= 0; i--) {
      if (photos[i].category.name == nameCategory) {
        figureImg.splice(i, 1);
        figureTitre.splice(i, 1);
        figureId.splice(i, 1);
      }
    }

    for (let i = 0; i < figureId.length; i++) {
      const selectGallery = document.querySelector(".gallery");
      const figureTest = document.createElement("figure");
      const pictureTest = document.createElement("img");
      const figureTitle = document.createElement("figcaption");
      pictureTest.src = figureImg[i];
      pictureTest.alt = figureTitre[i];
      figureTitle.innerText = figureTitre[i];
      figureTest.appendChild(pictureTest);
      figureTest.appendChild(figureTitle);
      selectGallery.appendChild(figureTest);
  }
    
}

