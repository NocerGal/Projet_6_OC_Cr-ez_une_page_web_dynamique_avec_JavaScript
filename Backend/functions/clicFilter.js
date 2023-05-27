const apiCategories = await fetch("http://localhost:5678/api/categories");
const categories = await apiCategories.json();

export function clicFilter() {

    const selectLi = document.querySelectorAll("#portfolio nav ul li");
    // Permet de changer de couleur les boutons
    for (let i = 0; i <= categories.length; i++) {
        selectLi[i].addEventListener("click", function () {
            if (selectLi[i].classList.contains("selected")) {
                selectLi[i].classList.remove("selected");
                selectLi[i].classList.add("filter", "unselected");

            } else {
                selectLi[i].classList.remove("unselected");
                selectLi[i].classList.add("selected");
            }
        })
    }
}
