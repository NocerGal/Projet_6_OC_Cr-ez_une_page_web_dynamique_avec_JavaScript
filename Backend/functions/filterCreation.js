// Création de la partie filtre en fonction du nombre de catégorie existantes
const apiCategories = await fetch("http://localhost:5678/api/categories");
const categories = await apiCategories.json();

export function filterCreation() {

    for (let i = 0; i < categories.length; i++) {
        const selectCategorie = document.querySelector("#portfolio nav ul");
        const categorieFilter = document.createElement("li");

        categorieFilter.innerHTML = categories[i].name;

        categorieFilter.classList.add("filter", "unselected");

        selectCategorie.appendChild(categorieFilter);
    }
}