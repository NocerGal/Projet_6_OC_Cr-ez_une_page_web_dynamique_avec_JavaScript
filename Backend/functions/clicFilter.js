

import { cleanElements } from "./cleanElement.js";
import { creationFigureElement } from "./initializationCreationFigureElement.js";
import { categories, photos } from "./constants/index.js";

export function clicFilter() {
  const selectLi = document.querySelectorAll("#portfolio nav ul li");

  // Début EventListener
  for (let i = categories.length; i >= 0; i--) {
    selectLi[i].addEventListener("click", function () {
      cleanElements();

      // const filterSelected = selectLi[i].innerText.includes("Tous");

      // switch (filterSelected){
      //   case "Tous":
      //   break
      // };
      // Si le filtre cliqué est "tous" alors unselect les autres filtres et regénérer la page photo.
      if (selectLi[i].innerText.includes("Tous")) {
        cleanElements();
        selectLi[i].classList.add("selected");
        for (let i = 1; i < categories.length + 1; i++) {
          selectLi[i].classList.remove("selected");
          selectLi[i].classList.add("unselected");
        }
        creationFigureElement();
      }

      // Si le filtre cliqué n'est pas "Tous"
      else {
        const figureImg = photos.map((pic) => pic.imageUrl);
        const figureTitre = photos.map((titre) => titre.title);
        const figureId = photos.map((idUrl) => idUrl.id);

        // SI le boouton cliqué n'est pas "Tous" et qu'il contien la class selected alors...
        if (selectLi[i].classList.contains("selected")) {
          selectLi[i].classList.remove("selected");
          selectLi[i].classList.add("filter", "unselected");

          const nameCategory = selectLi[i].innerText;

          // Pour chaque photo qui ne fait pas partie de la categorie du bouton cliqué alors supprime les photos du tableau mappé
          for (let i = photos.length - 1; i >= 0; i--) {
            if (photos[i].category.name == nameCategory) {
              const figureImg = photos.map((pic) => pic.imageUrl);
              const figureTitre = photos.map((titre) => titre.title);
              const figureId = photos.map((idUrl) => idUrl.id);
              figureImg.splice(i, 1);
              figureTitre.splice(i, 1);
              figureId.splice(i, 1);
            }
          }

          // Après retraitement des tableaux mappés, on va regénérer les photos à afficher en fonction des éléments du tabealu mappé

          for (let i = 0; i < figureId.length; i++) {}

          // Si le filtre cliqué ne contient pas la balise selected alorss...
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
