const express = require('express')
const router = express.Router()


const taskController = require('../controller/taskController.js')

router.get('/get-tasks', taskController.fetchTasksController)
router.post('/add-task', taskController.addTaskController)


module.exports = router
