export function erasePicture(e) {
  let indexOfTrash = Array.from(
    document.querySelectorAll("#galery-modal .fa-trash-can")
  ).indexOf(e.target);
  console.log(indexOfTrash);
}
