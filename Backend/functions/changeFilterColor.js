export function changeFilterColor(){

    if (selectLi[i].classList.contains("selected")) {
        selectLi[i].classList.remove("selected");
        selectLi[i].classList.add("filter", "unselected");
    } else {
        selectLi[i].classList.remove("unselected");
        selectLi[i].classList.add("selected");
    }
}