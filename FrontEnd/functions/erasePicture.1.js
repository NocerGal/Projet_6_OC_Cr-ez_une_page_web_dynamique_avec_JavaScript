export function erasePicture(picture, index) {
  const id = JSON.parse(sessionStorage.getItem("photosToErase"))[index].id;

  let request = fetch("http://localhost:5678/api/works/" + id, {
    method: "DELETE",
    headers: {
      Authorization: `Bearer ${sessionStorage.getItem("token")}`,
    },
  }).then((res) => {
    console.log(res);
  });
}
