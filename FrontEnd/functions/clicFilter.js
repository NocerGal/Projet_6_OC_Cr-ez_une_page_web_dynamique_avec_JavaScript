import { cleanElements } from "./cleanElement.js";
import { creationFigureElement } from "./initializationCreationFigureElement.js";
import { categories, photos } from "./constants/index.js";

function selectOnly(buttonFilter) {
  const allButtons = document.querySelectorAll("#portfolio nav ul li");
  allButtons.forEach((button) => button.classList.remove("selected"));
  buttonFilter.classList.add("selected");
}

function selectImgagesWithCategory(buttonFilter) {
  cleanElements();

  if (buttonFilter != "Tous") {
    const picsRegardingFilter = photos.filter(
      (photo) => photo.category.name == buttonFilter
    );
    creationFigureElement(picsRegardingFilter, ".gallery");
  } else {
    creationFigureElement(photos, ".gallery");
  }
}

function handleClick(e) {
  const buttonFilter = e.target;
  selectOnly(buttonFilter);
  selectImgagesWithCategory(buttonFilter.innerText);
}

export function clicFilter() {
  const selectLi = document.querySelectorAll("#portfolio nav ul li");

  for (let i = categories.length; i >= 0; i--) {
    selectLi[i].addEventListener("click", handleClick);
  }
}
