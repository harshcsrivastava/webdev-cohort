const input = document.getElementById("itemInput");
const addBtn = document.getElementById("addBtn");

const list = document.getElementById("list");

addBtn.addEventListener("click", () => {
  if (input.value === "") {
    alert("Mat Kar Lala");
    return;
  }

  const div = document.createElement("div");
  const li = document.createElement("li");
  const span = document.createElement("span");
  const delBtn = document.createElement("button");
  const editBtn = document.createElement("button");

  delBtn.textContent = "Delete";
  delBtn.classList.add("delete");
  delBtn.style.marginLeft = "5px";

  editBtn.textContent = "Edit";
  editBtn.classList.add("edit");

  span.textContent = input.value;
  span.style.width = "60%";
  span.style.textAlign = "left";

  div.style.width = "40%";

  div.appendChild(editBtn);
  div.appendChild(delBtn);
  li.appendChild(span);
  li.appendChild(div);
  list.appendChild(li);

  input.value = "";

  delBtn.addEventListener("click", () => {
    list.removeChild(li);
  });

  // Todo : Make this editable and autoSave when hatana

  editBtn.addEventListener("click", () => {
    if (span.isContentEditable) {
      // DONE STATE
      if (span.innerText.trim() === "") {
        li.remove();
        return;
      }

      span.contentEditable = false;
      span.classList.remove("focus");
      editBtn.textContent = "Edit";
      editBtn.classList.add("edit");
      editBtn.classList.remove("done");
    } else {
      // EDIT STATE
      span.contentEditable = true;
      span.classList.add("focus");
      span.focus();
      editBtn.textContent = "Done";
      editBtn.classList.add("done");
      editBtn.classList.remove("edit");
    }
  });
});
