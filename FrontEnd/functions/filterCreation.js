const apiCategories = await fetch("./api/categories");
const categories = await apiCategories.json();

export function filterCreation() {
  for (let i = 0; i < categories.length; i++) {
    const selectCategorie = document.querySelector("#portfolio nav ul");
    const categorieFilter = document.createElement("li");

    categorieFilter.innerHTML = categories[i].name;

    categorieFilter.classList.add("filter");

    selectCategorie.appendChild(categorieFilter);
  }
}
