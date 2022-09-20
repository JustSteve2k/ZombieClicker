// Shows and hides a modal.
export function ShowModal(header, content) {
    let box = document.getElementById("modalContent");
    let background = document.getElementById("modalBackground");
    let modHeader = document.getElementById("modHeader");
    let modText = document.getElementById("modText");
    document.getElementById("modHeader").innerText = header;
    document.getElementById("modText").innerText = content;
    /*Old style that allowed a transition to work. */
    // if (box != null && background != null) {
    //   if (box.style.height == "0px") {
    //     box.style.height = "200px";
    //     background.style.height = "100%";
    //     box.classList.add("shown");
    //   } else {
    //     box.style.height = "0px";
    //     background.style.height = "0px";
    //   }
    // }
    console.log("works!");
    box.classList.toggle("hidden");
    background.classList.toggle("hidden");
}
export function CloseModal() {
    let box = document.getElementById("modalContent");
    let background = document.getElementById("modalBackground");
    box.classList.toggle("hidden");
    background.classList.toggle("hidden");
}
