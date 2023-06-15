document.querySelector(".model-publish").addEventListener("click", () => {
  const pictureToErase = JSON.parse(sessionStorage.getItem("photosToErase"));
  const pictureToPublish = JSON.parse(
    sessionStorage.getItem("photosToPublish")
  );

  async function publishNewGallery(picture, index) {
    const formData = new FormData();
    formData.append("id", 1);
    formData.append("title", "Bonjour");
    formData.append(
      "imageUrl",
      "http://localhost:5678/images/la-balisiere1651287350102.png"
    );
    formData.append("category", "2");
    formData.append("userId", 1);

    let request = await fetch("http://localhost:5678/api/works", {
      method: "POST",
      headers: {
        Authorization: `Bearer ${sessionStorage.getItem("token")}`,
      },
      body: formData,
    });
  }

  pictureToPublish.forEach((picture, index) =>
    publishNewGallery(picture, index)
  );
});

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
