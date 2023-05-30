import { cleanElements } from "./cleanElement.js";
import { creationFigureElement } from "./initializationCreationFigureElement.js";

const apiCategories = await fetch("http://localhost:5678/api/categories");
const categories = await apiCategories.json();

const apiPhotos = await fetch("http://localhost:5678/api/works");
const photos = await apiPhotos.json();

export function clicFilter() {
  const selectLi = document.querySelectorAll("#portfolio nav ul li");

  // Permet de changer de couleur les boutons
  for (let i = categories.length; i >= 0; i--) {
    selectLi[i].addEventListener("click", function () {
      cleanElements();

      // If si le clic est sur tous
      if (selectLi[i].innerText.includes("Tous")) {
        cleanElements();
        selectLi[i].classList.add("selected");
        for (let i = 1; i < categories.length + 1; i++) {
          selectLi[i].classList.remove("selected");
          selectLi[i].classList.add("unselected");
        }
        creationFigureElement();
      } else {
        const figureImg = photos.map((pic) => pic.imageUrl);
        const figureTitre = photos.map((titre) => titre.title);
        const figureId = photos.map((idUrl) => idUrl.id);

        // Si sélectionné alors...
        if (selectLi[i].classList.contains("selected")) {
          selectLi[i].classList.remove("selected");
          selectLi[i].classList.add("filter", "unselected");

          const nameCategory = selectLi[i].innerText;

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

          // Else Selected
        } else {
          selectLi[i].classList.remove("unselected");
          selectLi[i].classList.add("selected");

          const nameCategory = selectLi[i].innerText;

          for (let i = photos.length - 1; i >= 0; i--) {
            if (photos[i].category.name != nameCategory) {
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
      }
    });
  }
}
