
const taskInput = document.getElementById("task-input");
const dateInput = document.getElementById("date-input");
const addBtn = document.getElementById("add-btn");
const filterBtn = document.getElementById("filter-btn");
const deleteAllBtn = document.getElementById("delete-all-btn");
const tableBody = document.getElementById("task-table-body");

let tasks = [];

window.onload = function () {
    const savedTasks = localStorage.getItem("tasks");
    if (savedTasks) {
        tasks = JSON.parse(savedTasks);
        renderTasks();
    }
};

function renderTasks() {
    tableBody.innerHTML = "";

    if (tasks.length === 0) {
        tableBody.innerHTML = `<tr><td colspan="4">No Task Found</td></tr>`;
        return;
    }

    tasks.forEach(task => {
        const row = document.createElement("tr");

        const taskCell = document.createElement("td");
        taskCell.textContent = task.task;
        if (task.done) taskCell.classList.add("completed");

        const dateCell = document.createElement("td");
        dateCell.textContent = task.date;

        const statusCell = document.createElement("td");
        statusCell.textContent = task.done ? "Done" : "Not Done";

        const actionCell = document.createElement("td");

        const doneBtn = document.createElement("button");
        doneBtn.textContent = "✔";
        doneBtn.addEventListener("click", () => toggleDone(task.id));

        const deleteBtn = document.createElement("button");
        deleteBtn.textContent = "🗑";
        deleteBtn.addEventListener("click", () => deleteTask(task.id));

        actionCell.appendChild(doneBtn);
        actionCell.appendChild(deleteBtn);

        row.appendChild(taskCell);
        row.appendChild(dateCell);
        row.appendChild(statusCell);
        row.appendChild(actionCell);

        tableBody.appendChild(row);
    });
}

function saveToLocalStorage() {
    localStorage.setItem("tasks", JSON.stringify(tasks));
}

addBtn.addEventListener("click", function () {
    const taskValue = taskInput.value.trim();
    const dateValue = dateInput.value;

    if (!taskValue || !dateValue) {
        alert("Please fill all fields");
        return;
    }

    const newTask = {
        id: Date.now(),
        task: taskValue,
        date: dateValue,
        done: false
    };

    tasks.push(newTask);
    saveToLocalStorage();
    renderTasks();

    taskInput.value = "";
    dateInput.value = "";
});

function toggleDone(id) {
    tasks = tasks.map(task => {
        if (task.id === id) task.done = !task.done;
        return task;
    });
    saveToLocalStorage();
    renderTasks();
}

function deleteTask(id) {
    tasks = tasks.filter(task => task.id !== id);
    saveToLocalStorage();
    renderTasks();
}

deleteAllBtn.addEventListener("click", function () {
    if (confirm("Are you sure you want to delete all tasks?")) {
        tasks = [];
        saveToLocalStorage();
        renderTasks();
    }
});

filterBtn.addEventListener("click", function () {
    tasks.sort((a, b) => {
        if (a.done !== b.done) return a.done ? 1 : -1; 
        return new Date(a.date) - new Date(b.date);     
    });
    saveToLocalStorage();
    renderTasks();
});
