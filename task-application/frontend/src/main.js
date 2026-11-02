import { addTask } from "./addTask.js"
import { renderTask } from "./taskrender.js"

const taskForm = document.getElementById('task-form')

const taskInput = document.getElementById('task-input')

export const taskList = document.getElementById('task-list')

// global state tasks

// export let tasks = JSON.parse(localStorage.getItem('tasks')) || []

export const fetchTasks = async () => {

  try{
      const data = await fetch('http://localhost:3000/api/get-tasks', {method: 'GET'})
      const tasks = await data.json()
      console.log(tasks)
      return tasks.length ? tasks: []

  }catch(err){
      console.log(err)
  }

} 


// show the tasks on first load
await renderTask()


// form submit
taskForm.addEventListener('submit' , (e) => {
  addTask(e, tasks, taskInput.value)
  taskInput.value = ''
})