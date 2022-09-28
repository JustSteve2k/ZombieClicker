// Shows and hides a modal.
export function ShowModal(header: string, content: string) {
  let box = document.getElementById("modalContent")!;
  let background = document.getElementById("modalBackground")!;
  let modHeader = document.getElementById("modHeader")!;
  let modText = document.getElementById("modText")!;

  document.getElementById("modHeader")!.innerText = header;
  document.getElementById("modText")!.innerText = content;

  console.log("works!");
  box.classList.toggle("hidden");
  background.classList.toggle("hidden");
}

export function CloseModal() {
  let box = document.getElementById("modalContent")!;
  let background = document.getElementById("modalBackground")!;

  box.classList.toggle("hidden");
  background.classList.toggle("hidden");
}
