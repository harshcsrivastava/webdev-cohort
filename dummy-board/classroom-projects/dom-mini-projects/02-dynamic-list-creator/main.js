const input = document.getElementById("itemInput");
const addBtn = document.getElementById("addBtn")

const list = document.getElementById("list")
console.log(list);


addBtn.addEventListener("click" , ()=>{
    if(input.value === ""){
      alert("Mat Kar Lala")
      return
    }


    // list.innerHTML += `<li>${input.value}</li>`
    const li = document.createElement("li")
    const delBtn = document.createElement("button")    
    delBtn.textContent = "Delete"
    delBtn.classList.add("delete")

    li.textContent = input.value

    delBtn.addEventListener("click", () => {
      list.removeChild(li)
    })

    li.appendChild(delBtn)
    list.appendChild(li)

    // Make this editable and autoSave when hatana
    input.value = ""
})