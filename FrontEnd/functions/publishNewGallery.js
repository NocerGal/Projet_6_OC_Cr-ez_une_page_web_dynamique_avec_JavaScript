import { dataURLtoFile } from "./dataURLtoFile.js";

export function publishNewGallery(picture, index) {
  const formData = new FormData();
  const photo = JSON.parse(sessionStorage.getItem("photosToPublish"))[index]
    .imageUrl;
  const title = JSON.parse(sessionStorage.getItem("photosToPublish"))[index]
    .title;
  const category = JSON.parse(sessionStorage.getItem("photosToPublish"))[index]
    .categoryId;
  formData.append("image", dataURLtoFile(photo, title));
  formData.append("title", title);
  formData.append("category", category);

  let request = fetch("http://localhost:5678/api/works", {
    method: "POST",
    headers: {
      Authorization: `Bearer ${sessionStorage.getItem("token")}`,
    },
    body: formData,
  }).then((res) => {
    console.log(res);
  });
}
