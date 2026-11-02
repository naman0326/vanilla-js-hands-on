import { renderTask } from "./taskrender"

import Toastify from 'toastify-js'
import "toastify-js/src/toastify.css"


export async function addTask(e, value){
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
    const task = {text: value.trim(), is_completed: false, time_due: timeStamp.toDateString()}
    
    // post request to the backend

    try{
        const res = await fetch('http://localhost:3000/api/add-task',{
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(task)
        })

        if(!res.ok){
            throw new Error(`HTTP error! Status: ${res.status}`)
        }

        const data = await res.json()
        console.log('Success', data)
        return data

    }catch(err){
        console.log(err)
    }
    

    await renderTask()
}