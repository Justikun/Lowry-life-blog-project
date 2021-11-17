require('dotenv').config()
const path = require('path')
const express = require('express')
const app = express()
const cors = require('cors')
const {SERVER_PORT} = process.env
const {seed} = require('./seed.js')

app.get('/', (req, res) => {
    res.sendFile(path.join(__dirname, '../index.html'))
})

app.use(express.json())
app.use(cors())

// DEV
app.post('/seed', seed)

app.listen(SERVER_PORT, () => console.log(`Up on ${SERVER_PORT}`))