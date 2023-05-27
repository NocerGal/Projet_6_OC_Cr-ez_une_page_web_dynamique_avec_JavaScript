const apiPhotos = await fetch("http://localhost:5678/api/works");
const photos = await apiPhotos.json();

export function creationFigureElement() {

    for (let i = 0; i < photos.length; i++) {
        const selectGallery = document.querySelector(".gallery");

        // permet de créer la balise figure
        const figureElement = document.createElement("figure");
        // permet de créer la balise img
        const imageElement = document.createElement("img");
        // permet de créer la balise figcaption
        const figcaptionElement = document.createElement("figcaption");

        // Va attribuer les valeurs/texts/images souhaitées en fonction
        // des données obtenues par l'API
        imageElement.src = photos[i].imageUrl;
        imageElement.alt = photos[i].title;
        figcaptionElement.innerHTML = photos[i].title;

        // Va attribuer les balises img et figcaption à la balise figure
        figureElement.appendChild(imageElement);
        figureElement.appendChild(figcaptionElement);

        // Attribue la balise figure contenant l'image et le texte
        // à la div gallery
        selectGallery.appendChild(figureElement);
    }

}