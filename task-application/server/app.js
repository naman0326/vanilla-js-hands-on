const express = require('express')

require('dotenv').config()

const app = express()
const cors = require('cors')


const taskRoutes = require('./routes/taskRoutes.js')

const port = 3000

app.use(cors(
    {
        origin: 'http://localhost:5173',
        // credentials: true
    }
))
app.use(express.json())
app.use(express.urlencoded({extended: true}))




app.get('/', (req, res) => {
    res.send('HellO world!')
})


// healthcheck
app.get('/health', (req, res) => {
    res.send('API is working fine')
})

app.use('/api', taskRoutes)


app.listen(port, () => {
    console.log(`task app listening on port ${port}`)
})