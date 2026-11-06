import { addTask } from "./addTask.js"
import { renderTask } from "./taskrender.js"

const taskForm = document.getElementById('task-form')

const taskInput = document.getElementById('task-input')

export const taskList = document.getElementById('task-list')


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
taskForm.addEventListener('submit' , async (e) => {
  e.preventDefault()
  await addTask(taskInput.value)
  await renderTask()
  taskInput.value = ''
})