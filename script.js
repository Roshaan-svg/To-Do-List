const InputBox = document.getElementById("input-box");
const ListContainer = document.getElementById("list-container");

function AddTask() {
    let task = InputBox.value.trim(); // remove spaces
    if (task === "") {
        alert("You must write something!");
    } else {
        let li = document.createElement("li");
        li.textContent = task; // safer than innerHTML
        ListContainer.appendChild(li);

        let span = document.createElement("span");
        span.innerHTML = "\u00d7"; // close button
        li.appendChild(span);
    }
    InputBox.value = "";
    saveData();
}

// Mark as checked or delete on click
ListContainer.addEventListener("click", function (e) {
    if (e.target.tagName === "LI") {
        e.target.classList.toggle("checked");
        saveData();
    } else if (e.target.tagName === "SPAN") {
        e.target.parentElement.remove();
        saveData();
    }
}, false);

// Save tasks in local storage
function saveData() {
    localStorage.setItem("Data", ListContainer.innerHTML);
}

// Show tasks when page loads
function showData() {
    let storedData = localStorage.getItem("Data");
    if (storedData) {
        ListContainer.innerHTML = storedData;
    }
}

showData();

// ✅ Allow pressing Enter key to add task
InputBox.addEventListener("keypress", function (e) {
    if (e.key === "Enter") {
        AddTask();
    }
});