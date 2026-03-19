const columns = document.querySelectorAll(".column");
let draggedTask = null;

// pure column pe hi event listener delegate kr do
document.addEventListener("click", (event) => {
    if (event.target.classList.contains("add-btn")) {
        const text = prompt("Enter your task");

        if (!text) return;

        const task = document.createElement("div");
        task.className = "task";
        task.textContent = text;

        // contenteditable="true" -> make content editable
        // draggable = true -> make it draggable

        task.setAttribute("draggable", true);

        event.target.previousElementSibling.appendChild(task);
    }
});

document.addEventListener("dragstart", (e) => {
    if(e.target.classList.contains("task")) {
        draggedTask = e.target;
       e.target.classList.add("dragging")
    }
});

document.addEventListener("dragend", (e) => {
    if (e.target.classList.contains("task")) {
        e.target.classList.remove("dragging");
        draggedTask = null;
    }
});

columns.forEach((col) => {
    // jab hath me hai to dragover
    // by default drag nhi krne dena
    col.addEventListener("dragover", (e) => {
        e.preventDefault() // nhi kiya to drag-drop default rokta hai kyoki
        col.classList.add("drag-over")
    })

    // jab us class se chala gya to dragleave
    col.addEventListener("dragleave", (e) => {
        col.classList.remove("drag-over")
    })

    col.addEventListener("drop", (e) => {
        col.classList.remove("drag-over")

        if(draggedTask){
            col.querySelector(".tasks").appendChild(draggedTask)
        }
    })
})