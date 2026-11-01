const express = require('express')

const app = express()

const tasksRoute = require('./routes/getTasks.js')
const addRoute = require('./routes/addTask.js')

const port = 3000


app.use(express.json())
app.use(express.urlencoded({extended: true}))


app.get('/', (req, res) => {
    res.send('HellO world!')
})


// healthcheck
app.get('/health', (req, res) => {
    res.send('API is working fine')
})

app.use('/get-tasks', tasksRoute)
app.use('/add-tasks', addRoute)

app.listen(port, () => {
    console.log(`task app listening on port ${port}`)
})