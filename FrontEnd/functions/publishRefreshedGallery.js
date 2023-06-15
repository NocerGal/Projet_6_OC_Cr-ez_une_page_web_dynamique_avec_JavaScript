document.querySelector(".model-publish").addEventListener("click", () => {
  const pictureToErase = JSON.parse(sessionStorage.getItem("photosToErase"));
  const pictureToPublish = JSON.parse(
    sessionStorage.getItem("photosToPublish")
  );

  pictureToPublish.forEach((picture, index) =>
    publishNewGallery(picture, index)
  );
});

function publishNewGallery(picture, index) {
  const formData = new FormData();
  const fileInput = document.querySelector("#photo-upload");
  formData.append("title", "Bonjour");
  formData.append("image", fileInput.files[0]);
  formData.append("category", "2");

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

// `Bearer ${sessionStorage.getItem("token")}`
// formData.append("categoryId", pictureToPublish[index].categoryId);
// formData.append("userId", Number(sessionStorage.getItem("id")));

// console.log(
//   formData.append("userId", Number(sessionStorage.getItem("id")))
// );

// let request = new XMLHttpRequest();
// request.open("POST", "http://localhost:5678/api/works");
// request.send(formData);
// let formData = {
//   id: pictureToPublish[index].id,
//   title: pictureToPublish[index].title,
//   imageUrl: pictureToPublish[index].imageUrl,
//   categoryId: pictureToPublish[index].categoryId,
//   userId: Number(sessionStorage.getItem("id")),
// };
