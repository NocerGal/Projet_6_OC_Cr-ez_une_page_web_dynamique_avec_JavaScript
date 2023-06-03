const apiCategories = await fetch("http://localhost:5678/api/categories");
const apiPhotos = await fetch("http://localhost:5678/api/works");

export const photos = await apiPhotos.json();
export const categories = await apiCategories.json(); 