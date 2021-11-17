require('dotenv').config()

const path = require('path')
const express = require('express')
const app = express()
const cors = require('cors')
const {SERVER_PORT} = process.env
const {seed} = require('./seed.js')

app.use(express.json())
app.use(cors())

// For Heroku to serve my js and css
app.get('/', (req, res) => {
    res.sendFile(path.join(__dirname, '../index.html'))
})

app.get('/js', (req, res) => {
    res.sendFile(path.join(__dirname, './public/main.js'))
})
// DEV
app.post('/seed', seed)

const port = process.env.PORT || SERVER_PORT
app.listen(port, () => console.log(`Up on ${port}`))