export function saveTodos(tasks){
    localStorage.setItem('tasks', JSON.stringify(tasks))
}