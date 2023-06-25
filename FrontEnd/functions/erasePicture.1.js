export function erasePicture(picture, index) {
  const id = JSON.parse(sessionStorage.getItem("photosToErase"))[index].id;

  let request = fetch("./api/works/" + id, {
    method: "DELETE",
    headers: {
      Authorization: `Bearer ${sessionStorage.getItem("token")}`,
    },
  }).then((res) => {
    console.log(res);
  });
}
