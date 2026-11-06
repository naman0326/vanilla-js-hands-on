const express = require('express')
const router = express.Router()


const taskController = require('../controller/taskController.js')

router.get('/get-tasks', taskController.fetchTasksController)
router.post('/add-task', taskController.addTaskController)

router.put('/get-tasks/update/:id', taskController.updateTaskStatus)
router.delete('/get-tasks/delete/:id', taskController.deleteTaskController)

module.exports = router
