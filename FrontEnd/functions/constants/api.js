const apiCategories = await fetch("./api/categories");
const apiPhotos = await fetch("./api/works");

export const photos = await apiPhotos.json();
export const categories = await apiCategories.json();
