import { saveTodos } from "./saveTodos"
import { taskList } from "./main"

import Toastify from 'toastify-js'
import "toastify-js/src/toastify.css"

export function renderTask(tasks) {
    taskList.innerHTML = ''

    // Ensure the container has its core class name
    taskList.className = 'task-list'

    if (tasks.length === 0) {
        taskList.innerHTML = '<h3 class="empty-state">Add your first task!</h3>'
        return
    }

    tasks.forEach((task) => {
        const li = document.createElement('li')
        li.className = 'task-item'
        
        const taskText = document.createElement('span')
        taskText.className = `task-text ${task.is_completed ? 'completed' : ''}`
        taskText.textContent = task.text

        const deleteBtn = document.createElement('button')
        deleteBtn.className = 'btn-delete'
        deleteBtn.textContent = 'Delete'

        const dateElement = document.createElement('span')
        dateElement.className = 'task-date'
        
        // Format the date so it reads cleanly instead of showing a raw timestamp
        dateElement.textContent = 'Due: '
        dateElement.textContent += task.time_due ? new Date(task.time_due).toLocaleDateString() : ''

        // Toggle task completion status
        taskText.addEventListener('click', () => {
            task.is_completed = !task.is_completed
            saveTodos(tasks)
            renderTask(tasks)
        })
          
        // Delete task
        deleteBtn.addEventListener('click', () => {
            const targetIndex = tasks.findIndex(t => t.id === task.id)
            if (targetIndex !== -1) {
                tasks.splice(targetIndex, 1)
            }
            saveTodos(tasks)
            
            Toastify({
                text: 'Deleted your task...',
                duration: 3000,
                gravity: 'top',
                position: "right",
                style: {
                    background: "#da0000",
                    color: 'white',
                    padding: '12px 24px',
                    borderRadius: '6px',
                    fontSize: '14px'
                }
            }).showToast()
            
            renderTask(tasks)
        })

        // Assemble components
        li.appendChild(taskText)
        li.appendChild(dateElement)
        li.appendChild(deleteBtn)

        taskList.append(li)
    })
}
