import { saveTodos } from "./saveTodos";
import { fetchTasks, taskList } from "./main";

import Toastify from "toastify-js";
import "toastify-js/src/toastify.css";
import { deleteTask } from "./handlers/deleteTask";
import { updateTask } from "./handlers/updateTask";

let currentFilter = "all";

export async function renderTasks() {
  // retrieve tasks from backend
  const tasks = await fetchTasks();
  console.log(tasks);

  taskList.innerHTML = "";

  // Ensure the container has its core class name
  taskList.className = "task-list";

  // filtering tasks based on "active" and "completed"
  console.log(tasks);
  let filteredTasks = tasks;

  if (currentFilter === "active") {
    filteredTasks = tasks.filter((task) => !task.is_completed);
  }

  if (currentFilter === "completed") {
    filteredTasks = tasks.filter((task) => task.is_completed);
  }

  if (tasks.length === 0) {
    taskList.innerHTML = '<h3 class="empty-state">Add your first task!</h3>';
    return;
  }

  filteredTasks.forEach((task) => {
    const li = document.createElement("li");
    li.className = "task-item";

    const taskText = document.createElement("span");
    taskText.className = `task-text ${task.is_completed ? "completed" : ""}`;
    taskText.textContent = task.text;

    const deleteBtn = document.createElement("button");
    deleteBtn.className = "btn-delete";
    deleteBtn.textContent = "Delete";

    const dateElement = document.createElement("span");
    dateElement.className = "task-date";

    // Format the date so it reads cleanly instead of showing a raw timestamp
    dateElement.textContent = "Due: ";
    dateElement.textContent += task.time_due
      ? new Date(task.time_due).toLocaleDateString()
      : "";

    // Toggle task completion status
    taskText.addEventListener("click", async () => {
      await updateTask(task.id);
      // task.is_completed = !task.is_completed

      Toastify({
        text: "Well done...",
        duration: 3000,
        gravity: "top",
        position: "right",
        style: {
          background: "#26b569",
          color: "white",
          padding: "12px 24px",
          borderRadius: "6px",
          fontSize: "14px",
        },
      }).showToast();

      await renderTasks(tasks);
    });

    // Delete task
    deleteBtn.addEventListener("click", async () => {
      await deleteTask(task.id);

      Toastify({
        text: "Deleted your task...",
        duration: 3000,
        gravity: "top",
        position: "right",
        style: {
          background: "#da0000",
          color: "white",
          padding: "12px 24px",
          borderRadius: "6px",
          fontSize: "14px",
        },
      }).showToast();

      await renderTasks();
    });

    // Assemble components
    li.appendChild(taskText);
    li.appendChild(dateElement);
    li.appendChild(deleteBtn);

    taskList.append(li);
  });
}

// event listeners

document.getElementById("active-tasks").addEventListener("click", async () => {
  currentFilter = "active";
  await renderTasks();
});

document
  .getElementById("completed-tasks")
  .addEventListener("click", async () => {
    currentFilter = "completed";
    await renderTasks();
  });
