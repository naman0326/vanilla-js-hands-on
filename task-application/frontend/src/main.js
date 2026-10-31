import { addTask } from "./addTask.js"
import { renderTask } from "./taskrender.js"

const taskForm = document.getElementById('task-form')

const taskInput = document.getElementById('task-input')

export const taskList = document.getElementById('task-list')

// global state tasks

export let tasks = JSON.parse(localStorage.getItem('tasks')) || []

// show the tasks on first load
renderTask(tasks)


// form submit
taskForm.addEventListener('submit' , (e) => {
  addTask(e, tasks, taskInput.value)
  taskInput.value = ''
})