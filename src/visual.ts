// Shows and hides a modal.
export function ShowModal(text: string) {
  let box = document.getElementById("modalContent");
  let background = document.getElementById("modalBackground");

  document.getElementById("modText")!.innerText = text;

  if (box != null && background != null) {
    if (box.style.height == "0px") {
      box.style.height = "200px";
      background.style.height = "100%";
    } else {
      box.style.height = "0px";
      background.style.height = "0px";
    }
  }
}
