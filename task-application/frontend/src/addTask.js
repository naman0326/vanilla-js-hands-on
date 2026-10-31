import { saveTodos } from "./saveTodos"
import { renderTask } from "./taskrender"

import Toastify from 'toastify-js'
import "toastify-js/src/toastify.css"


export function addTask(e, tasks, value){
    e.preventDefault()
    if(!value.trim()){
        return;
    }
    Toastify({
        text: 'Keep the tasks coming!',
        duration: 4000,
        gravity: 'top',
        position: 'left',
        style: {
            background: '#472d8e',
            color: '#fff',
            padding: '12px 24px',
            borderRadius: '6px',
            fontSize: '14px'
        }
    }).showToast()

    const timeStamp = new Date()
    const task = {id: crypto.randomUUID(), text: value.trim(), is_completed: false, time_due: timeStamp.toDateString()}
    tasks.unshift(task)
    saveTodos(tasks)
    renderTask(tasks)
}