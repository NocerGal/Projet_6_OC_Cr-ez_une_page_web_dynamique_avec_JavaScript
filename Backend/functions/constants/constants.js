import { photos, categories } from "./api.js"

export const selectLi = document.querySelectorAll("#portfolio nav ul li");

export const figureImg = photos.map((pic) => pic.imageUrl);
export const figureTitre = photos.map((titre) => titre.title);
export const figureId = photos.map((idUrl) => idUrl.id);